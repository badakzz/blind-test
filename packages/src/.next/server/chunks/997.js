exports.id = 997;
exports.ids = [997];
exports.modules = {

/***/ 5440:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const dotenv = __webpack_require__(5142)
dotenv.config({ path: "../env/local.env" })

const knexfile = __webpack_require__(2795)
const knex = __webpack_require__(514)(knexfile["production" || 0])

module.exports = knex


/***/ }),

/***/ 2795:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const dotenv = __webpack_require__(5142)
const path = __webpack_require__(1017)
dotenv.config({ path: path.resolve(__dirname, "../env/local.env") })

const config = {
    development: {
        client: "pg",
        connection: {
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
        },
        migrations: {
            directory: path.join(__dirname, "db", "migrations"),
        },
        seeds: {
            directory: path.join(__dirname, "db", "seeds"),
        },
    },
    production: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: path.join(__dirname, "db", "migrations"),
        },
        seeds: {
            directory: path.join(__dirname, "db", "seeds", "production"),
        },
    },
}

module.exports = config


/***/ }),

/***/ 2533:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Fg": () => (/* reexport */ IRON_SESSION_CONFIG),
  "vs": () => (/* reexport */ analyzeAnswerAndAttributeScore),
  "gI": () => (/* reexport */ normalizeAnswer),
  "t": () => (/* reexport */ startGame),
  "wA": () => (/* reexport */ startPlayback),
  "NA": () => (/* reexport */ withSession)
});

// UNUSED EXPORTS: calculateAnswerSimilarity, calculateLevenshteinDistance, getPasswordRuleLabel, isEmailDomainValid, isEmailValid, isFieldUnique, isPasswordValid

// EXTERNAL MODULE: ../../models/knex.js
var knex = __webpack_require__(5440);
;// CONCATENATED MODULE: ../common/utils/helpers/dbHelper.ts

async function isFieldUnique(tableName, fieldName, fieldValue) {
    const existingRecord = await Knex(tableName).where(fieldName, fieldValue).first();
    return !existingRecord;
}

;// CONCATENATED MODULE: ./utils/helpers/gameHelper.ts
const startGame = async (setGameStarted, trackPreviews, startPlayback, setCurrentSongIndex, isGameStopped, audio)=>{
    setGameStarted(true);
    // Check if the first track and its previewUrl are not null or undefined
    if (trackPreviews[0] && trackPreviews[0].previewUrl) {
        // Play the first track
        const newAudio = startPlayback(trackPreviews[0], trackPreviews, setCurrentSongIndex, isGameStopped, audio);
        return newAudio;
    } else {
        console.error("Invalid first track or track.previewUrl is not defined.");
        return null;
    }
};
const startPlayback = (song, trackPreviews, setCurrentSongIndex, isGameStopped, audio)=>{
    if (isGameStopped) {
        console.log("Playlist stopped");
        return null // don't play the next song if the game is stopped
        ;
    }
    console.log("artist", song.artist);
    console.log("song", song.name);
    if (!song || !song.previewUrl) {
        console.error("Invalid song or song.previewUrl is not defined.");
        return;
    }
    audio.src = song.previewUrl;
    audio.volume = 0.2;
    audio.play().catch((error)=>{
        console.error("Failed to play the track:", error);
    });
    audio.onerror = (error)=>{
        console.error("An error occurred while trying to play the audio:", error);
    };
    // When the track ends, play the next one (if there are any left)
    audio.onended = ()=>{
        setCurrentSongIndex((prevIndex)=>{
            const nextIndex = prevIndex + 1;
            // Stop after 10 tracks
            if (nextIndex < 10 && trackPreviews[nextIndex]) {
                // Wait for 5 seconds before playing the next track
                setTimeout(()=>{
                    startPlayback(trackPreviews[nextIndex], trackPreviews, setCurrentSongIndex, isGameStopped, audio);
                }, 5000);
            } else {
            // Game is over, handle this as needed
            }
            return nextIndex;
        });
    };
    return audio // Return the Audio object
    ;
};
function normalizeAnswer(answer) {
    // Remove all non-alphanumeric characters (except for spaces and dashes)
    answer = answer.toLowerCase().replace(/[^\w\s-]/gi, "");
    // Remove words in parentheses
    answer = answer.replace(/ *\([^)]*\) */g, " ");
    // If there's a dash in the song name, only keep what's after the dash
    if (answer.includes("-")) {
        answer = answer.substring(answer.indexOf("-") + 1);
    }
    // If the answer starts with a number, remove it (and the following space)
    answer = answer.replace(/^\d+\s/, "");
    // If there's a "feat" in the song name, only keep what's before "feat"
    if (answer.includes("feat")) {
        answer = answer.substring(0, answer.indexOf("feat"));
    }
    // Remove multiple spaces
    answer = answer.replace(/\s+/g, " ").trim();
    return answer;
}
const calculateLevenshteinDistance = (a, b)=>{
    const matrix = [];
    for(let i = 0; i <= b.length; i++){
        matrix[i] = [
            i
        ];
    }
    for(let i = 0; i <= a.length; i++){
        matrix[0][i] = i;
    }
    for(let i = 1; i <= b.length; i++){
        for(let j = 1; j <= a.length; j++){
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
            }
        }
    }
    return matrix[b.length][a.length];
};
const calculateAnswerSimilarity = (a, b)=>{
    const distance = calculateLevenshteinDistance(a, b);
    const longestLength = Math.max(a.length, b.length);
    return (longestLength - distance) / longestLength;
};
const analyzeAnswerAndAttributeScore = (userId, normalizedParsedSongNameWords, normalizedMGuessWords, normalizedParsedArtistNameWords)=>{
    const minAccuracy = 0.9;
    let points = 0;
    let correctGuessType = "";
    let nameCorrect = normalizedParsedSongNameWords.every((songWord, i)=>normalizedMGuessWords[i] !== undefined && calculateAnswerSimilarity(songWord, normalizedMGuessWords[i]) >= minAccuracy);
    let artistCorrect = normalizedParsedArtistNameWords.every((artistWord, i)=>normalizedMGuessWords[i] !== undefined && calculateAnswerSimilarity(artistWord, normalizedMGuessWords[i]) >= minAccuracy);
    if (nameCorrect && !artistCorrect) {
        points += 0.5;
        correctGuessType = "song name";
    }
    if (artistCorrect && !nameCorrect) {
        points += 0.5;
        correctGuessType = "artist name";
    }
    if (artistCorrect && nameCorrect) {
        points += 1;
        correctGuessType = "artist and the song names";
    }
    return {
        points,
        correctGuessType,
        userId
    };
};

// EXTERNAL MODULE: external "next-iron-session"
var external_next_iron_session_ = __webpack_require__(4511);
;// CONCATENATED MODULE: ./utils/helpers/ironSessionHelper.ts

const IRON_SESSION_CONFIG = {
    password: "Blindtest123!Blindtest123!Blindtest123!",
    cookieName: "BLINDTESTCOOKIE",
    cookieOptions: {
        secure: "production" === "production"
    }
};
function withSession(handler) {
    return (0,external_next_iron_session_.withIronSession)(handler, IRON_SESSION_CONFIG);
}

;// CONCATENATED MODULE: ./utils/helpers/index.ts



// export * from "./generateUniqueId"




/***/ })

};
;
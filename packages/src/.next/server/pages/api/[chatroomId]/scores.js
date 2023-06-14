"use strict";
(() => {
var exports = {};
exports.id = 770;
exports.ids = [770];
exports.modules = {

/***/ 5142:
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ 8506:
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ 514:
/***/ ((module) => {

module.exports = require("knex");

/***/ }),

/***/ 4511:
/***/ ((module) => {

module.exports = require("next-iron-session");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 3881:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ scores)
});

// EXTERNAL MODULE: external "next-iron-session"
var external_next_iron_session_ = __webpack_require__(4511);
;// CONCATENATED MODULE: ../common/utils/validation/scoreboardSchema.ts
const Joi = __webpack_require__(8506);
const scoreboardSchema_scoreboardSchema = Joi.object({
    user_id: Joi.number().required(),
    chatroom_id: Joi.string().required(),
    score: Joi.number().required()
});

// EXTERNAL MODULE: ../../models/knex.js
var knex = __webpack_require__(5480);
var knex_default = /*#__PURE__*/__webpack_require__.n(knex);
// EXTERNAL MODULE: ../common/constants/index.ts + 1 modules
var constants = __webpack_require__(1053);
;// CONCATENATED MODULE: ../common/dao/ScoreboardDAO.ts


async function incrementScore(userId, chatroomId, points) {
    return Knex(TABLE.SCOREBOARD).where({
        chatroom_id: chatroomId,
        user_id: userId
    }).increment("points", points).returning("*");
}
async function createScore(userId, chatroomId, points) {
    return Knex("scoreboard").insert({
        chatroom_id: chatroomId,
        user_id: userId,
        points: points
    });
}
async function getScoreListByChatroomId(chatroomId) {
    return knex_default()(constants/* TABLE.SCOREBOARD */.F.SCOREBOARD).where({
        chatroom_id: chatroomId
    }).join(constants/* TABLE.USERS */.F.USERS, `${constants/* TABLE.SCOREBOARD */.F.SCOREBOARD}.user_id`, `${constants/* TABLE.USERS */.F.USERS}.user_id`).select(`${constants/* TABLE.USERS */.F.USERS}.user_name`, `${constants/* TABLE.SCOREBOARD */.F.SCOREBOARD}.points`).orderBy(`${constants/* TABLE.SCOREBOARD */.F.SCOREBOARD}.points`, "desc");
}
async function getMaxScoreForChatroomId(chatroomId) {
    return knex_default()(constants/* TABLE.SCOREBOARD */.F.SCOREBOARD).where({
        chatroom_id: chatroomId
    }).max("points as max_points").first();
}
// export async function getScoreList(chatroomId): Promise<Score[]> {
//     return Knex(TABLE.SCOREBOARD)
//         .where({
//             chatroom_id: chatroomId,
//         })
//         .select("user_id", "points")
// }
async function checkIfGuessed(userId, chatroomId, guess, type) {
    return knex_default()("guessed_songs").where("user_id", userId).andWhere("chatroom_id", chatroomId).andWhere("guess", guess).andWhere("guess_type", type).first();
}
async function checkIfAnyUserGuessed(chatroomId, guess, type) {
    return knex_default()("guessed_songs").where("chatroom_id", chatroomId).andWhere("guess", guess).andWhere("guess_type", type).first();
}
async function recordGuess(userId, chatroomId, guess, type) {
    return knex_default()("guessed_songs").insert({
        user_id: userId,
        chatroom_id: chatroomId,
        guess: guess,
        guess_type: type
    });
} // check return types

;// CONCATENATED MODULE: ../common/services/scoreboardServices.ts


const updateScoreboard = async (currentChatroomId, userId, points)=>{
    console.log("updateScorePoints", userId, points);
    if (typeof currentChatroomId !== "string") {
        throw new Error(`Invalid chatroom_id: ${currentChatroomId}. It should be a string.`);
    }
    const { error  } = scoreboardSchema.validate({
        user_id: userId,
        chatroom_id: currentChatroomId,
        score: points
    }, {
        abortEarly: false
    });
    if (error) {
        throw new Error("Validation failed: " + error.details.map((detail)=>detail.message));
    }
    try {
        const updatedScore = await ScoreboardDAO.incrementScore(userId, currentChatroomId, points);
        if (!updatedScore || updatedScore.points === 0) {
            // If the user doesn't have a score entry yet, create one
            await ScoreboardDAO.createScore(userId, currentChatroomId, points);
        }
    } catch (err) {
        console.error("Failed to update scoreboard:", err);
    }
};
const scoreboardServices_getScoreListByChatroomId = getScoreListByChatroomId;
const scoreboardServices_getMaxScoreForChatroomId = getMaxScoreForChatroomId;
const checkIfUserAlreadyGuessed = checkIfGuessed;
const checkIfAnyUserAlreadyGuessed = checkIfAnyUserGuessed;
const scoreboardServices_recordGuess = recordGuess;

// EXTERNAL MODULE: external "joi"
var external_joi_ = __webpack_require__(8506);
var external_joi_default = /*#__PURE__*/__webpack_require__.n(external_joi_);
;// CONCATENATED MODULE: ./pages/api/[chatroomId]/scores/index.ts



const schemaQuery = external_joi_default().object({
    chatroomId: external_joi_default().string().required()
});
const handler = (0,external_next_iron_session_.withIronSession)(async (req, res)=>{
    if (req.method !== "GET") {
        return res.status(405).end();
    }
    const user = req.session.get("user");
    if (!user) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    const sanitizedQuery = await schemaQuery.validateAsync(req.query);
    if (!sanitizedQuery.chatroomId) {
        return res.status(400).json({
            message: "Missing chatroom id"
        });
    }
    try {
        const scores = await scoreboardServices_getScoreListByChatroomId(sanitizedQuery.chatroomId);
        res.status(200).json(scores);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({
            message: error.message
        });
    }
}, {
    cookieName: "BLINDTESTCOOKIE",
    password: "Blindtest123!Blindtest123!Blindtest123!",
    cookieOptions: {
        secure: "production" === "development"
    }
});
/* harmony default export */ const scores = (handler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [107], () => (__webpack_exec__(3881)));
module.exports = __webpack_exports__;

})();
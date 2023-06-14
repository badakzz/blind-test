exports.id = 107;
exports.ids = [107];
exports.modules = {

/***/ 5480:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const dotenv = __webpack_require__(5142)
dotenv.config({ path: "../env/local.env" })

const knexfile = __webpack_require__(5771)
const knex = __webpack_require__(514)(knexfile["production" || 0])

module.exports = knex


/***/ }),

/***/ 5771:
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

/***/ 1053:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "F": () => (/* reexport */ TABLE)
});

;// CONCATENATED MODULE: ../common/constants/tables.ts
var TABLE;
(function(TABLE) {
    TABLE["USERS"] = "users";
    TABLE["CHATROOMS"] = "chatrooms";
    TABLE["CHAT_MESSAGES"] = "chat_messages";
    TABLE["GUESSED_SONGS"] = "guessed_songs";
    TABLE["SCOREBOARD"] = "scoreboard";
})(TABLE || (TABLE = {}));

;// CONCATENATED MODULE: ../common/constants/index.ts



/***/ })

};
;
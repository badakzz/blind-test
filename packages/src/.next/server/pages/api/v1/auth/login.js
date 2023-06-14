"use strict";
(() => {
var exports = {};
exports.id = 396;
exports.ids = [396];
exports.modules = {

/***/ 8432:
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

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

/***/ 3922:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_iron_session__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4511);
/* harmony import */ var next_iron_session__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_iron_session__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_services_userServices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2677);


const dotenv = __webpack_require__(5142);
dotenv.config({
    path: "../../../../env/local.env"
});
const sessionConfig = {
    cookieName: "BLINDTESTCOOKIE",
    password: "Blindtest123!Blindtest123!Blindtest123!",
    cookieOptions: {
        secure: "production" === "production"
    }
};
const handler = async (req, res)=>{
    if (req.method !== "POST") {
        return res.status(405).end();
    }
    const { identifier , password  } = req.body;
    try {
        const user = await (0,_common_services_userServices__WEBPACK_IMPORTED_MODULE_1__/* .authenticateUser */ .So)(identifier, password);
        req.session.set("user", user);
        await req.session.save();
        res.status(200).json({
            message: "Logged in successfully"
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(401).json({
            message: error.message
        });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_iron_session__WEBPACK_IMPORTED_MODULE_0__.withIronSession)(handler, sessionConfig));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [107,677], () => (__webpack_exec__(3922)));
module.exports = __webpack_exports__;

})();
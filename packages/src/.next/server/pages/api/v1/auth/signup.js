"use strict";
(() => {
var exports = {};
exports.id = 657;
exports.ids = [657];
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

/***/ 3061:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ signup)
/* harmony export */ });
/* harmony import */ var _common_services_userServices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2677);
/* harmony import */ var next_iron_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4511);
/* harmony import */ var next_iron_session__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_iron_session__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7873);



async function signup(req, res) {
    try {
        await (0,next_iron_session__WEBPACK_IMPORTED_MODULE_1__.applySession)(req, res, _utils_helpers__WEBPACK_IMPORTED_MODULE_2__/* .IRON_SESSION_CONFIG */ .Fg) // Apply the session
        ;
        const user = await (0,_common_services_userServices__WEBPACK_IMPORTED_MODULE_0__/* .signupUser */ .EL)({
            req,
            res
        }) // Get the created user
        ;
        if (user) {
            // Check if the user object is valid
            req.session.set("user", user) // Set the user information in the session
            ;
            await req.session.save() // Save the session
            ;
            res.status(201).json({
                message: "User created and logged in successfully"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [107,677], () => (__webpack_exec__(3061)));
module.exports = __webpack_exports__;

})();
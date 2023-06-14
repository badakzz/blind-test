"use strict";
(() => {
var exports = {};
exports.id = 502;
exports.ids = [502];
exports.modules = {

/***/ 4511:
/***/ ((module) => {

module.exports = require("next-iron-session");

/***/ }),

/***/ 6475:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_iron_session__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4511);
/* harmony import */ var next_iron_session__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_iron_session__WEBPACK_IMPORTED_MODULE_0__);

const sessionOptions = {
    cookieName: "BLINDTESTCOOKIE",
    password: "Blindtest123!Blindtest123!Blindtest123!"
};
const handler = async (req, res)=>{
    if (req.method === "POST") {
        // Call the destroy method on the session object
        req.session.destroy();
        // Send a successful response
        res.status(200).json({
            message: "Logged out successfully"
        });
    } else {
        // Handle other request methods
        res.setHeader("Allow", [
            "POST"
        ]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_iron_session__WEBPACK_IMPORTED_MODULE_0__.withIronSession)(handler, sessionOptions));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(6475));
module.exports = __webpack_exports__;

})();
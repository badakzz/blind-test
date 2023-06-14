"use strict";
(() => {
var exports = {};
exports.id = 673;
exports.ids = [673];
exports.modules = {

/***/ 5061:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ callback)
});

;// CONCATENATED MODULE: external "react/jsx-runtime"
const jsx_runtime_namespaceObject = require("react/jsx-runtime");
;// CONCATENATED MODULE: external "next/router"
const router_namespaceObject = require("next/router");
;// CONCATENATED MODULE: external "react"
const external_react_namespaceObject = require("react");
;// CONCATENATED MODULE: ./pages/api/spotify/callback.tsx



const SpotifyCallback = ()=>{
    const router = (0,router_namespaceObject.useRouter)();
    (0,external_react_namespaceObject.useEffect)(()=>{
        // Extract the authorization code from the URL
        const code = router.query.code;
        if (code) {
        // Exchange the authorization code for an access token
        // You'll need to make an API call to the Spotify token endpoint here
        // After successfully getting the access token, you can store it and redirect the user to the desired page
        }
    }, [
        router
    ]);
    return /*#__PURE__*/ jsx_runtime_namespaceObject.jsx("div", {
        children: "Loading..."
    });
};
/* harmony default export */ const callback = (SpotifyCallback);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(5061));
module.exports = __webpack_exports__;

})();
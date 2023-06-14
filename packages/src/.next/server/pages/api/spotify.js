"use strict";
(() => {
var exports = {};
exports.id = 8;
exports.ids = [8];
exports.modules = {

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 4485:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAccessToken": () => (/* binding */ getAccessToken),
/* harmony export */   "getAvailableGenres": () => (/* binding */ getAvailableGenres),
/* harmony export */   "getMultipleRandomTrackPreviewsFromPlaylist": () => (/* binding */ getMultipleRandomTrackPreviewsFromPlaylist),
/* harmony export */   "getPlaylistsByGenre": () => (/* binding */ getPlaylistsByGenre)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

// const dotenv = require("dotenv")
// dotenv.config({ path: "./env/local.env" })
const clientId = "8d38a65dff9043f5a3b6347289960af1";
const clientSecret = "3ce88440fc4f4863a6975db64062a7b2";
let accessToken = "";
const getAccessToken = async ()=>{
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("https://accounts.spotify.com/api/token", null, {
        params: {
            grant_type: "client_credentials"
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`
        }
    });
    accessToken = response.data.access_token;
};
const getAvailableGenres = async (country = "US", locale = "en_US")=>{
    if (!accessToken) {
        await getAccessToken();
    }
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("https://api.spotify.com/v1/browse/categories", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        params: {
            country: country,
            locale: locale
        }
    });
    return response.data.categories.items;
};
const getPlaylistsByGenre = async (genreId, country = "US", locale = "en_US")=>{
    if (!accessToken) {
        await getAccessToken();
    }
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        params: {
            country: country,
            locale: locale
        }
    });
    return response.data.playlists.items;
};
const getMultipleRandomTrackPreviewsFromPlaylist = async (playlistId, numPreviews)=>{
    if (!accessToken) {
        await getAccessToken();
    }
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const tracksWithPreview = response.data.items.filter((item)=>item.track.preview_url);
    if (tracksWithPreview.length === 0) {
        throw new Error("No tracks with previews found in the playlist.");
    }
    const previews = [];
    for(let i = 0; i < numPreviews; i++){
        const randomTrack = tracksWithPreview[Math.floor(Math.random() * tracksWithPreview.length)];
        previews.push({
            previewUrl: randomTrack.track.preview_url,
            name: randomTrack.track.name,
            artist: randomTrack.track.artists[0].name
        });
    }
    return previews;
} // add error gestion for token expiration
;

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4485));
module.exports = __webpack_exports__;

})();
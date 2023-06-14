"use strict";
(() => {
var exports = {};
exports.id = 49;
exports.ids = [49];
exports.modules = {

/***/ 8299:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(358);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);



const Button = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef(({ isLoading , LeftIcon , RightIcon , children , ...restOfProps }, ref)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Button, {
        ...restOfProps,
        // ref={ref}
        className: `${restOfProps?.className || ""} d-flex align-items-center justify-content-center`,
        children: [
            isLoading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Spinner, {
                animation: "border",
                size: "sm"
            }),
            !!LeftIcon && !isLoading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(LeftIcon, {
                size: 12,
                className: "me-2"
            }),
            !isLoading && children,
            !!RightIcon && !isLoading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RightIcon, {
                size: 12,
                className: "ms-2"
            })
        ]
    }));
// Fix react/display-name
Button.displayName = "Button";
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (Button)));


/***/ }),

/***/ 8704:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const ChatMessagesContainer = ({ messages , connectedUsers , user , socket  })=>{
    const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const sendMessageHandler = ()=>{
        if (message) {
            socket.emit("chatMessage", message, user.user_id);
            setMessage("");
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                children: messages.map((msg, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    msg.user_name,
                                    ": "
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: msg.message
                            })
                        ]
                    }, i))
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        type: "text",
                        value: message,
                        onChange: (e)=>setMessage(e.target.value)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: sendMessageHandler,
                        children: "Send"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    "Users online:",
                    connectedUsers.map((user)=>user.user_name).join(", ")
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatMessagesContainer);


/***/ }),

/***/ 336:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const CreateOrJoinRoom = ({ onCreate , onJoin , user  })=>{
    const [username, setUsername] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(user ? user.user_name : "");
    const [chatroomId, setChatroomId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const handleCreate = (e)=>{
        e.preventDefault();
        onCreate(username);
    };
    const handleJoin = (e)=>{
        e.preventDefault();
        onJoin(username, chatroomId);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                htmlFor: "username",
                children: "Username:"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                type: "text",
                id: "username",
                value: username,
                readOnly: !!user,
                onChange: (e)=>setUsername(e.target.value),
                required: true
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                htmlFor: "chatroomId",
                children: "Chatroom ID (leave blank to create a new room):"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                type: "text",
                id: "chatroomId",
                value: chatroomId,
                onChange: (e)=>setChatroomId(e.target.value)
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: handleCreate,
                children: "Create Room"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: handleJoin,
                children: "Join Room"
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateOrJoinRoom);


/***/ }),

/***/ 5220:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(358);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);



const Input = ({ label , name , required , formControlProps , canHaveError , error , size , placeholder , setHasFormErrors , ...restOfProps })=>{
    return /*#__PURE__*/ _jsxs(Form.Group, {
        ...restOfProps,
        children: [
            !!label && /*#__PURE__*/ _jsxs(Form.Label, {
                className: "fw-bold",
                children: [
                    label,
                    required && /*#__PURE__*/ _jsx("span", {
                        style: styles.star,
                        children: ` *`
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(Form.Control, {
                ...formControlProps,
                placeholder: placeholder,
                required: required,
                name: name,
                style: {
                    ...formControlProps?.style || {},
                    ...size === "sm" ? styles.smFormControl : {}
                }
            }),
            canHaveError && /*#__PURE__*/ _jsx("div", {
                style: size === "sm" ? styles.smErrorContainer : styles.errorContainer,
                className: "d-flex flex-column justify-content-end align-items-end w-100",
                children: !!error && /*#__PURE__*/ _jsx("div", {
                    className: "text-danger",
                    style: size === "sm" ? styles.smErrorLabel : {},
                    children: error
                })
            })
        ]
    });
};
const styles = {
    star: {
        color: "var(--bs-red)"
    },
    errorContainer: {
        minHeight: 24
    },
    smErrorContainer: {
        minHeight: 22
    },
    smFormControl: {
        fontSize: 13
    },
    smErrorLabel: {
        fontSize: 13
    }
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (Input)));


/***/ }),

/***/ 4863:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pages_api_spotify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7825);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_api_spotify__WEBPACK_IMPORTED_MODULE_2__]);
_pages_api_spotify__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// components/PlaylistSelectionModal.tsx



const PlaylistSelectionModal = ({ show , onPlaylistSelected , onModalClose  })=>{
    const [selectedPlaylistId, setSelectedPlaylistId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [playlistList, setPlaylistList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const fetchPlaylists = async ()=>{
            const genreIdList = await (0,_pages_api_spotify__WEBPACK_IMPORTED_MODULE_2__/* .getAvailableGenres */ .MC)().then((genres)=>genres.map((item)=>item.id));
            const promises = genreIdList.map((genre)=>(0,_pages_api_spotify__WEBPACK_IMPORTED_MODULE_2__/* .getPlaylistsByGenre */ .iA)(genre));
            const playlistListByGenre = await Promise.all(promises);
            const playlistList = playlistListByGenre.reduce((acc, playlists)=>{
                return playlists ? acc.concat(playlists.filter((item)=>item !== null)) : acc;
            }, []);
            // Remove duplicates
            const uniquePlaylistList = Array.from(new Set(playlistList.map((playlist)=>playlist.id))).map((id)=>{
                return playlistList.find((playlist)=>playlist.id === id);
            });
            setPlaylistList(uniquePlaylistList);
        };
        fetchPlaylists();
    }, []);
    const handlePlaylistChange = (event)=>{
        setSelectedPlaylistId(event.target.value);
    };
    const handleSubmit = ()=>{
        if (selectedPlaylistId) {
            onPlaylistSelected(selectedPlaylistId);
            onModalClose();
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        style: {
            display: show ? "block" : "none"
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                    children: "Select a Playlist"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("select", {
                    onChange: handlePlaylistChange,
                    children: playlistList.map((playlist)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                            value: playlist.id,
                            children: playlist.name
                        }, playlist.id))
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    onClick: handleSubmit,
                    children: "Submit"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    onClick: onModalClose,
                    children: "Close"
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlaylistSelectionModal);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3417:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(358);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9648);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1175);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_query__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common_utils_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7535);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__]);
axios__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const Scoreboard = ({ chatroomId: chatroomId  })=>{
    const [show, setShow] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true);
    const handleClose = ()=>setShow(false);
    const handleShow = ()=>setShow(true);
    const { showErrorToast  } = (0,_common_utils_hooks__WEBPACK_IMPORTED_MODULE_5__/* .useToastContext */ .V)();
    const queryClient = (0,react_query__WEBPACK_IMPORTED_MODULE_4__.useQueryClient)();
    const QK_SCORES = "scoreboard";
    const fetchScores = async (chatroomId)=>{
        return axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(`/api/${chatroomId}/scores`).then(({ data  })=>data);
    };
    const { isLoading , error , data , isSuccess  } = (0,react_query__WEBPACK_IMPORTED_MODULE_4__.useQuery)(QK_SCORES, ()=>fetchScores(chatroomId), {
        onError: (e)=>showErrorToast(e)
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal, {
            show: show,
            onHide: handleClose,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.Header, {
                    closeButton: true,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.Title, {
                        children: "Game End Scores"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.Body, {
                    children: data && !isLoading && data.map((score, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            children: [
                                score.user_name,
                                ": ",
                                score.points
                            ]
                        }, index))
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.Footer, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Button, {
                        variant: "secondary",
                        onClick: handleClose,
                        children: "Close"
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scoreboard);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9909:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$T": () => (/* reexport safe */ _CreateOrJoinChatroom__WEBPACK_IMPORTED_MODULE_2__.Z),
/* harmony export */   "Ov": () => (/* reexport safe */ _ChatMessagesContainer__WEBPACK_IMPORTED_MODULE_1__.Z),
/* harmony export */   "xB": () => (/* reexport safe */ _PlaylistSelectionModal__WEBPACK_IMPORTED_MODULE_5__.Z)
/* harmony export */ });
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8299);
/* harmony import */ var _ChatMessagesContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8704);
/* harmony import */ var _CreateOrJoinChatroom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(336);
/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5220);
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9295);
/* harmony import */ var _PlaylistSelectionModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4863);
/* harmony import */ var _ToastProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6104);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_PlaylistSelectionModal__WEBPACK_IMPORTED_MODULE_5__]);
_PlaylistSelectionModal__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];








__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7825:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MC": () => (/* binding */ getAvailableGenres),
/* harmony export */   "aw": () => (/* binding */ getMultipleRandomTrackPreviewsFromPlaylist),
/* harmony export */   "iA": () => (/* binding */ getPlaylistsByGenre)
/* harmony export */ });
/* unused harmony export getAccessToken */
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

/***/ }),

/***/ 7458:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4612);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9909);
/* harmony import */ var _api_spotify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7825);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2533);
/* harmony import */ var _components_Scoreboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3417);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([socket_io_client__WEBPACK_IMPORTED_MODULE_2__, _components__WEBPACK_IMPORTED_MODULE_3__, _api_spotify__WEBPACK_IMPORTED_MODULE_4__, _components_Scoreboard__WEBPACK_IMPORTED_MODULE_6__]);
([socket_io_client__WEBPACK_IMPORTED_MODULE_2__, _components__WEBPACK_IMPORTED_MODULE_3__, _api_spotify__WEBPACK_IMPORTED_MODULE_4__, _components_Scoreboard__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const getServerSideProps = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_5__/* .withSession */ .NA)(async ({ req , res  })=>{
    const user = req.session.get("user");
    if (user) {
        return {
            props: {
                user: user
            }
        };
    } else {
        return {
            props: {
                user: null
            }
        };
    }
});
const Chatroom = ({ user  })=>{
    const [socket, setSocket] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [connectedUsers, setConnectedUsers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    // users state is used to generated a guest id
    const [validatedUsername, setValidatedUsername] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [playlistId, setPlaylistId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [trackPreviews, setTrackPreviews] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [showPlaylistModal, setShowPlaylistModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [gameStarted, setGameStarted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [currentSongIndex, setCurrentSongIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [currentChatroomId, setCurrentChatroomId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [currentSongName, setCurrentSongName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [currentArtistName, setCurrentArtistName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [isGameStopped, setIsGameStopped] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isCreator, setIsCreator] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isGameStarting, setIsGameStarting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const audioRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)( true ? null : 0);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (playlistId) {
            const fetchTrackPreviews = async ()=>{
                const previews = await (0,_api_spotify__WEBPACK_IMPORTED_MODULE_4__/* .getMultipleRandomTrackPreviewsFromPlaylist */ .aw)(playlistId, 10);
                setTrackPreviews((prevState)=>[
                        ...prevState,
                        ...previews
                    ]) // spread the contents of previews
                ;
            };
            fetchTrackPreviews();
        }
    }, [
        playlistId
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const newSocket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_2__.io)("http://localhost:3001");
        setSocket(newSocket);
        newSocket.on("chatroomCreated", (chatroomId)=>{
            // Display the chatroom link when the room is created
            const currentUrl = window.location.href;
            const roomUrl = `${currentUrl}?chatroomId=${chatroomId}`;
            alert(`Chatroom created! Share this link with others to join: ${roomUrl}`);
            setCurrentChatroomId(chatroomId) // Set the current chatroom id
            ;
        });
        //needed?
        newSocket.on("users", (users)=>{
            setConnectedUsers(users);
        });
        return ()=>{
            newSocket.off("chatroomCreated");
            newSocket.disconnect();
        };
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (socket && isGameStarting) {
            if (!isCreator) {
                socket.on("gameStarted", (trackPreviews)=>{
                    setTrackPreviews(trackPreviews);
                    const newAudio = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_5__/* .startGame */ .t)(setGameStarted, trackPreviews, _utils_helpers__WEBPACK_IMPORTED_MODULE_5__/* .startPlayback */ .wA, setCurrentSongIndex, isGameStopped, audioRef.current);
                    if (newAudio) {
                        setCurrentSongIndex(0);
                    }
                    setIsGameStarting(false);
                });
                return ()=>{
                    socket.off("gameStarted");
                };
            } else {
                setTrackPreviews(trackPreviews);
                const newAudio = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_5__/* .startGame */ .t)(setGameStarted, trackPreviews, _utils_helpers__WEBPACK_IMPORTED_MODULE_5__/* .startPlayback */ .wA, setCurrentSongIndex, isGameStopped, audioRef.current);
                if (newAudio) {
                    setCurrentSongIndex(0);
                }
                setIsGameStarting(false);
            }
        }
    }, [
        socket,
        isGameStarting
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (trackPreviews && trackPreviews[currentSongIndex]) {
            setCurrentSongName(trackPreviews[currentSongIndex].name);
            setCurrentArtistName(trackPreviews[currentSongIndex].artist);
        }
    }, [
        trackPreviews,
        currentSongIndex
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (socket) {
            // Clean up old event listeners
            socket.off("chatMessage");
            socket.off("scoreUpdated");
            // Set up new event listeners
            socket.on("chatMessage", (msg, userId)=>{
                setMessages((currentMsg)=>[
                        ...currentMsg,
                        msg
                    ]);
                // Only analyze and attribute score for messages sent by the current user
                if (msg.user_id === user.user_id) {
                    const normalizedMGuessWords = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_5__/* .normalizeAnswer */ .gI)(msg.message).split(" ");
                    const normalizedParsedSongNameWords = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_5__/* .normalizeAnswer */ .gI)(currentSongName).split(" ");
                    const normalizedParsedArtistNameWords = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_5__/* .normalizeAnswer */ .gI)(currentArtistName).split(" ");
                    const answer = (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_5__/* .analyzeAnswerAndAttributeScore */ .vs)(user.user_id, normalizedParsedSongNameWords, normalizedMGuessWords, normalizedParsedArtistNameWords);
                    if (answer.points > 0) {
                        socket.emit("updateScore", currentChatroomId, user.user_id, answer.points, answer.correctGuessType, currentSongName, currentArtistName);
                    }
                }
            });
            socket.on("scoreUpdated", ({ user , correctGuessType  })=>{
                const guessMessage = {
                    user_name: "System",
                    message: `${user.user_name} has correctly guessed the ${correctGuessType}!`
                };
                socket.emit("chatMessage", guessMessage, user.user_id);
            });
            return ()=>{
                socket.off("chatMessage");
                socket.off("scoreUpdated");
            };
        }
    }, [
        socket,
        currentSongName,
        currentArtistName,
        user
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (socket) {
            socket.on("gameOver", (finalScores, winnerId)=>{
                setIsGameStopped(true);
                if (audioRef.current && audioRef.current instanceof Audio) {
                    audioRef.current.pause();
                } else {
                    console.error("Audio object is not defined or not an instance of Audio.");
                }
                console.log("Final scores:", finalScores);
                console.log("Winner:", winnerId);
            });
            return ()=>{
                socket.off("gameOver");
            };
        }
    }, [
        socket
    ]);
    const handleCreateRoom = (username)=>{
        let finalUsername = username;
        if (user) {
            finalUsername = user.user_name;
        } else if (!username) {
            finalUsername = `guest${connectedUsers.length + 1}`;
        }
        if (finalUsername) {
            socket.emit("createRoom", username);
            setValidatedUsername(true);
            setIsCreator(true);
        }
    };
    const handleJoinRoom = (username, chatroomId)=>{
        if (chatroomId) {
            let finalUsername = username;
            if (user) {
                finalUsername = user.user_name;
            } else if (!username) {
                finalUsername = `guest${connectedUsers.length + 1}`;
            }
            if (finalUsername) {
                setValidatedUsername(true);
                setIsCreator(false) // Set isCreator to false
                ;
                setIsGameStarting(true) // Set isGameStarting to true
                ;
                setCurrentChatroomId(chatroomId);
                socket.emit("joinRoom", username, chatroomId);
            }
        }
    };
    const handleOpenPlaylistModal = ()=>{
        setShowPlaylistModal(true);
    };
    const handleClosePlaylistModal = ()=>{
        setShowPlaylistModal(false);
    };
    const handlePlaylistSelected = (playlistId)=>{
        setPlaylistId(playlistId);
    };
    const handleStartGame = ()=>{
        socket.emit("startGame", currentChatroomId, trackPreviews);
        setIsGameStarting(true);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                children: "Chatroom"
            }),
            !validatedUsername && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_3__/* .CreateOrJoinChatroom */ .$T, {
                user: user,
                onCreate: handleCreateRoom,
                onJoin: handleJoinRoom
            }),
            validatedUsername && !playlistId && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: isCreator ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            onClick: handleOpenPlaylistModal,
                            children: "Select Playlist"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_3__/* .PlaylistSelectionModal */ .xB, {
                            show: showPlaylistModal,
                            onPlaylistSelected: handlePlaylistSelected,
                            onModalClose: handleClosePlaylistModal
                        })
                    ]
                }) : "Waiting for the host to launch the game"
            }),
            playlistId && !gameStarted && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: ()=>{
                    handleStartGame();
                    setGameStarted(true);
                },
                children: "Start Game"
            }),
            gameStarted && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_3__/* .ChatMessagesContainer */ .Ov, {
                messages: messages,
                user: user,
                connectedUsers: connectedUsers,
                socket: socket
            }),
            isGameStopped && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Scoreboard__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                chatroomId: currentChatroomId
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Chatroom);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6104:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "V": () => (/* binding */ useToastContext)
});

// UNUSED EXPORTS: default

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__(358);
;// CONCATENATED MODULE: external "lodash/throttle"
const throttle_namespaceObject = require("lodash/throttle");
;// CONCATENATED MODULE: ./components/ToastProvider.js




var ToastContext = /*#__PURE__*/ (0,external_react_.createContext)({
    showErrorToast: function() {},
    showSuccessToast: function() {}
});
var ToastProvider = function(_a) {
    var org = _a.org, children = _a.children;
    var _b = useState(null), toastConfig = _b[0], setToastConfig = _b[1];
    var _c = useState(false), isDemoErrorToastVisible = _c[0], setIsDemoErrorToastVisible = _c[1];
    var hideToast = function() {
        return setToastConfig(null);
    };
    var showErrorToast = function(error, errorHandler) {
        return setToastConfig({
            message: HandleErrorService.getErrorMessage(error, errorHandler),
            type: "error"
        });
    };
    var showSuccessToast = function(message) {
        return setToastConfig({
            message: message,
            type: "success"
        });
    };
    var showErrorToastThrottled = throttle(showErrorToast, 2000);
    return /*#__PURE__*/ React.createElement(ToastContext.Provider, {
        value: {
            showErrorToast: showErrorToastThrottled,
            showSuccessToast: showSuccessToast
        }
    }, children, /*#__PURE__*/ React.createElement(ToastContainer, {
        containerPosition: "fixed",
        position: "bottom-center",
        className: "mb-3",
        style: styles.toastContainer
    }, /*#__PURE__*/ React.createElement(Toast, {
        bg: (toastConfig === null || toastConfig === void 0 ? void 0 : toastConfig.type) === "success" ? "success" : "danger",
        show: !!toastConfig,
        onClose: hideToast,
        delay: 3000,
        autohide: true
    }, !!(toastConfig === null || toastConfig === void 0 ? void 0 : toastConfig.message) && /*#__PURE__*/ React.createElement(Toast.Body, {
        className: "text-white",
        style: styles.toastBody
    }, toastConfig.message))));
};
var DEMO_ERROR_TOAST_SIZE = 10;
var styles = {
    toastContainer: {
        zIndex: 2147483647
    },
    toastBody: {
        textAlign: "center"
    },
    demoErrorToast: {
        height: DEMO_ERROR_TOAST_SIZE,
        width: DEMO_ERROR_TOAST_SIZE,
        borderRadius: DEMO_ERROR_TOAST_SIZE / 2
    }
};
/* harmony default export */ const components_ToastProvider = ((/* unused pure expression or super */ null && (ToastProvider)));
var useToastContext = function() {
    return (0,external_react_.useContext)(ToastContext);
};


/***/ }),

/***/ 7535:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "V": () => (/* reexport safe */ _src_components_ToastProvider__WEBPACK_IMPORTED_MODULE_0__.V)
/* harmony export */ });
/* harmony import */ var _src_components_ToastProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6104);



/***/ }),

/***/ 5142:
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ 514:
/***/ ((module) => {

module.exports = require("knex");

/***/ }),

/***/ 4511:
/***/ ((module) => {

module.exports = require("next-iron-session");

/***/ }),

/***/ 4558:
/***/ ((module) => {

module.exports = require("next/config");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 358:
/***/ ((module) => {

module.exports = require("react-bootstrap");

/***/ }),

/***/ 6290:
/***/ ((module) => {

module.exports = require("react-icons/fa");

/***/ }),

/***/ 1175:
/***/ ((module) => {

module.exports = require("react-query");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 4612:
/***/ ((module) => {

module.exports = import("socket.io-client");;

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [997,295], () => (__webpack_exec__(7458)));
module.exports = __webpack_exports__;

})();
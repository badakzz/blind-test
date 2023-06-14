import React, { createContext, useContext, useState, } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import throttle from "lodash/throttle";
import HandleErrorService from "../ErrorHandlerService";
var ToastContext = createContext({ showErrorToast: function () { }, showSuccessToast: function () { } });
var ToastProvider = function (_a) {
    var org = _a.org, children = _a.children;
    var _b = useState(null), toastConfig = _b[0], setToastConfig = _b[1];
    var _c = useState(false), isDemoErrorToastVisible = _c[0], setIsDemoErrorToastVisible = _c[1];
    var hideToast = function () { return setToastConfig(null); };
    var showErrorToast = function (error, errorHandler) {
        return setToastConfig({
            message: HandleErrorService.getErrorMessage(error, errorHandler),
            type: "error",
        });
    };
    var showSuccessToast = function (message) {
        return setToastConfig({
            message: message,
            type: "success",
        });
    };
    var showErrorToastThrottled = throttle(showErrorToast, 2000);
    return (React.createElement(ToastContext.Provider, { value: {
            showErrorToast: showErrorToastThrottled,
            showSuccessToast: showSuccessToast,
        } },
        children,
        React.createElement(ToastContainer, { containerPosition: "fixed", position: "bottom-center", className: "mb-3", style: styles.toastContainer },
            React.createElement(Toast, { bg: (toastConfig === null || toastConfig === void 0 ? void 0 : toastConfig.type) === "success" ? "success" : "danger", show: !!toastConfig, onClose: hideToast, delay: 3000, autohide: true }, !!(toastConfig === null || toastConfig === void 0 ? void 0 : toastConfig.message) && (React.createElement(Toast.Body, { className: "text-white", style: styles.toastBody }, toastConfig.message))))));
};
var DEMO_ERROR_TOAST_SIZE = 10;
var styles = {
    toastContainer: {
        zIndex: 2147483647,
    },
    toastBody: {
        textAlign: "center",
    },
    demoErrorToast: {
        height: DEMO_ERROR_TOAST_SIZE,
        width: DEMO_ERROR_TOAST_SIZE,
        borderRadius: DEMO_ERROR_TOAST_SIZE / 2,
    },
};
export default ToastProvider;
export var useToastContext = function () { return useContext(ToastContext); };

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.GetExpressGlobal = exports.StartExpress = void 0;
var express_1 = __importDefault(require("express"));
var EXPRESS_GLOBAL = express_1["default"]();
function StartExpress() {
    EXPRESS_GLOBAL.listen(process.env.PORT, function () {
        console.log("Listening on port " + process.env.PORT);
    });
}
exports.StartExpress = StartExpress;
function GetExpressGlobal() {
    return EXPRESS_GLOBAL;
}
exports.GetExpressGlobal = GetExpressGlobal;

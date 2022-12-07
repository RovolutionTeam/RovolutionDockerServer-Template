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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhwcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9FeHByZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUU5QixNQUFNLGNBQWMsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUVqQyxNQUFNLFVBQVUsWUFBWTtJQUN4QixjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtRQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsTUFBTSxVQUFVLGdCQUFnQjtJQUM1QixPQUFPLGNBQWMsQ0FBQztBQUMxQixDQUFDIn0=

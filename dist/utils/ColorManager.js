"use strict";
exports.__esModule = true;
exports.RoleColours = void 0;
function RoleColours(role) {
    return role.hexColor === '#000000' || role.hexColor === undefined ? '#ffffff' : role.hexColor;
}
exports.RoleColours = RoleColours;

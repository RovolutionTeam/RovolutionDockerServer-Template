"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.SendMessage = void 0;
var Discord_1 = require("../utils/Discord");
function SendMessage(dbo, projectID, mainProject) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        function GenerateTopThree() {
            var outArray = [];
            var too = Object.keys(obj).length;
            if (too > 20)
                too = 20;
            for (var i = 0; i < too; i++) {
                if (obj[heighest[i]] === 0)
                    continue;
                outArray.push("".concat(i + 1, ".)").concat(heighest[i] === undefined
                    ? 'No One!'
                    : " ".concat(heighest[i], " - ").concat(obj[heighest[i]], " points ( ").concat(Weekbeforeobj[heighest[i]] < obj[heighest[i]] || Weekbeforeobj[heighest[i]] == undefined
                        ? '⬆️'
                        : Weekbeforeobj[heighest[i]] === obj[heighest[i]]
                            ? '⏺️'
                            : '⬇️', "  ").concat(Weekbeforeobj[heighest[i]] === undefined
                        ? obj[heighest[i]] * 100
                        : (Math.round(((Weekbeforeobj[heighest[i]] - obj[heighest[i]]) / Weekbeforeobj[heighest[i]]) * 1000) /
                            10) *
                            -1, "%)")));
            }
            return outArray.join('\n ');
        }
        function GenerateTrainings() {
            var endarray = [];
            mainProject.trainingTypes.forEach(function (data) {
                if (trainingOBJ[data] === undefined) {
                    trainingOBJ[data] = 0;
                }
                if (WeekbeforetrainingOBJ[data] === undefined) {
                    WeekbeforetrainingOBJ[data] = 0;
                }
            });
            for (var property in trainingOBJ) {
                var lastWeekNum = WeekbeforetrainingOBJ[property] || 0;
                var thisWeekNum = trainingOBJ[property] || 0;
                endarray.push("\u2022 ".concat(property, " - ").concat(trainingOBJ[property], " events ( ").concat(lastWeekNum < thisWeekNum || lastWeekNum == undefined ? '⬆️' : lastWeekNum === thisWeekNum ? '⏺️' : '⬇️', "  ").concat(lastWeekNum === 0 ? thisWeekNum * 100 : Math.round(((lastWeekNum - thisWeekNum) / lastWeekNum) * -1000) / 10, "%)"));
            }
            return endarray.join('\n ');
        }
        var StartDate, data, obj, trainingOBJ, total, lastTotal, superVisorPoints, coHostPoints, Array, heighest, endArray, _loop_1, i, WeekBeforeData, Weekbeforeobj, WeekbeforetrainingOBJ, totalIncrease, messsage, client, channel, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    StartDate = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
                    return [4 /*yield*/, dbo
                            .collection('EventResponses')
                            .find({
                            timestamp: {
                                $gte: StartDate / 1000
                            },
                            id: projectID
                        })
                            .toArray()];
                case 1:
                    data = (_d.sent());
                    obj = {};
                    trainingOBJ = {};
                    total = 0;
                    lastTotal = 0;
                    superVisorPoints = (_a = mainProject.SupervisorPoints) !== null && _a !== void 0 ? _a : 1;
                    coHostPoints = (_b = mainProject.CoHostingPoints) !== null && _b !== void 0 ? _b : 1;
                    data.forEach(function (Element) {
                        var _a, _b;
                        total++;
                        var eventPoints = (_a = mainProject.HostingPoints) !== null && _a !== void 0 ? _a : 1;
                        var attendancePoints = (_b = mainProject.AttendeePoints) !== null && _b !== void 0 ? _b : 1;
                        obj[Element.host] = obj[Element.host] === undefined ? eventPoints : obj[Element.host] + eventPoints;
                        obj[Element.supervisor] = obj[Element.supervisor] === undefined ? superVisorPoints : obj[Element.supervisor] + superVisorPoints;
                        obj[Element.cohost] = obj[Element.cohost] === undefined ? superVisorPoints : obj[Element.cohost] + coHostPoints;
                        trainingOBJ[Element.type] = trainingOBJ[Element.type] === undefined ? 1 : trainingOBJ[Element.type] + 1;
                        Element.attendees.forEach(function (Element2) {
                            obj[Element2] = obj[Element2] === undefined ? attendancePoints : obj[Element2] + attendancePoints;
                        });
                    });
                    delete obj['N/A'];
                    delete obj['None'];
                    delete trainingOBJ['None'];
                    delete trainingOBJ['N/A'];
                    Array = [];
                    Object.entries(obj).forEach(function (_a) {
                        var key = _a[0], value = _a[1];
                        Array.push({ key: key, value: value });
                    });
                    heighest = [];
                    endArray = __spreadArray([], Array, true);
                    _loop_1 = function (i) {
                        var HeighestName = undefined;
                        var value = -1;
                        var pos = undefined;
                        endArray.forEach(function (Element, i) {
                            if (Element.value > value) {
                                pos = i;
                                value = Element.value;
                                HeighestName = Element.key;
                            }
                        });
                        heighest.push(HeighestName);
                        endArray.splice(pos, 1);
                    };
                    for (i = 0; i < Array.length; i++) {
                        _loop_1(i);
                    }
                    return [4 /*yield*/, dbo
                            .collection('EventResponses')
                            .find({
                            timestamp: {
                                $gte: (StartDate - 7 * 24 * 60 * 60 * 1000) / 1000,
                                $lt: StartDate / 1000
                            },
                            id: projectID
                        })
                            .toArray()];
                case 2:
                    WeekBeforeData = (_d.sent());
                    Weekbeforeobj = {};
                    WeekbeforetrainingOBJ = {};
                    WeekBeforeData.forEach(function (Element) {
                        lastTotal++;
                        Weekbeforeobj[Element.host] = Weekbeforeobj[Element.host] === undefined ? 1 : Weekbeforeobj[Element.host] + 1;
                        Weekbeforeobj[Element.supervisor] = Weekbeforeobj[Element.supervisor] === undefined ? 1 : Weekbeforeobj[Element.supervisor] + 1;
                        Weekbeforeobj[Element.cohost] = Weekbeforeobj[Element.cohost] === undefined ? 1 : Weekbeforeobj[Element.cohost] + 1;
                        WeekbeforetrainingOBJ[Element.type] =
                            WeekbeforetrainingOBJ[Element.type] === undefined ? 1 : WeekbeforetrainingOBJ[Element.type] + 1;
                    });
                    delete Weekbeforeobj['N/A'];
                    delete WeekbeforetrainingOBJ['None'];
                    totalIncrease = Math.round(((lastTotal - total) / lastTotal) * -1000) / 10;
                    if (isFinite(totalIncrease) === false) {
                        totalIncrease = total * 100;
                    }
                    messsage = "__Weekly Round up for **".concat(mainProject.name, "**:__ \n \n ").concat(GenerateTopThree(), " \n\nThe trainings that happened this week are as followed: \n ").concat(GenerateTrainings(), " \n \nThis week there was a total of ").concat(total, " events, this is a ").concat(total >= lastTotal ? 'increase' : 'decrease', " of ").concat(totalIncrease, "%. \n\u00A9 *RovolutionLogistics 2020-").concat(new Date().getFullYear(), " *");
                    _d.label = 3;
                case 3:
                    _d.trys.push([3, 6, , 7]);
                    client = (0, Discord_1.FetchDiscordClient)();
                    channel = client.channels.cache.get(mainProject.AnnouncementChannel.value);
                    if (!(channel === null || channel === void 0 ? void 0 : channel.isText())) return [3 /*break*/, 5];
                    return [4 /*yield*/, channel.send(messsage)["catch"](function (e) { return console.log(e); })];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    _c = _d.sent();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.SendMessage = SendMessage;

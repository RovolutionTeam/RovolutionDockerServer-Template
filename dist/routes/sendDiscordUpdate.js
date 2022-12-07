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
exports.__esModule = true;
exports.method = void 0;
var discord_js_1 = require("discord.js");
var Discord_1 = require("../utils/Discord");
var Mongodb_1 = require("../utils/Mongodb");
var method = 'get';
exports.method = method;
var SERVER_API_KEY = '9e8b9de6-b417-469e-a1f1-28f58ff1b9aa';
function checkDiscordGuild(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, UUID, API_KEY, ProjectID, collection, Project, Training, exampleEmbed, fields, client, channel, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.query, UUID = _a.UUID, API_KEY = _a.API_KEY, ProjectID = _a.ProjectID;
                    if (API_KEY !== SERVER_API_KEY) {
                        res.status(400).send('Invalid API Key');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, Mongodb_1.FetchMongo)()];
                case 1:
                    collection = (_b.sent()).db('RovolutionLogistics');
                    return [4 /*yield*/, collection.collection('Projects').findOne({
                            UUID: ProjectID
                        })];
                case 2:
                    Project = (_b.sent());
                    return [4 /*yield*/, collection.collection('EventResponses').findOne({
                            id: ProjectID,
                            UUID: UUID
                        })];
                case 3:
                    Training = (_b.sent());
                    exampleEmbed = new discord_js_1.MessageEmbed();
                    fields = [
                        { name: 'Event Type:', value: Training.type, inline: false },
                        { name: 'Host:', value: Training.host, inline: false },
                    ];
                    if (Training.cohost !== null) {
                        if (Training.cohost === '')
                            Training.cohost = 'None';
                        fields.push({ name: 'Co-Host:', value: Training.cohost, inline: false });
                    }
                    if (Training.supervisor !== null) {
                        if (Training.supervisor === '')
                            Training.supervisor = 'None';
                        fields.push({ name: 'Supervisor:', value: Training.supervisor, inline: false });
                    }
                    fields.push({ name: 'Attendees:', value: Training.attendees.join(', '), inline: false });
                    fields.push({ name: 'Notes:', value: Training.notes === '' || Training.notes === undefined ? 'N/A' : Training.notes, inline: false });
                    if (Project.FailedTrainings === 'true') {
                        fields.push({ name: 'Failed Training:', value: "".concat(Training.failedTraining), inline: false });
                    }
                    try {
                        exampleEmbed
                            .setColor('#CC101F')
                            .setTitle('Event Report')
                            .setURL('https://logistics.rovolution.me/event/' + ProjectID)
                            .addFields(fields)
                            .setTimestamp()
                            .setAuthor({
                            name: 'RovolutionLogistics Bot',
                            url: 'https://logistics.rovolution.me/',
                            iconURL: 'https://logistics.rovolution.me/android-chrome-512x512.png'
                        })
                            .setFooter({ text: 'Powered by RovolutionLogistics' });
                        if (Training.image !== '') {
                            exampleEmbed.setImage(Training.image);
                        }
                    }
                    catch (e) {
                        console.log(e);
                        res.status(400).send('Failed to generate embed');
                        return [2 /*return*/];
                    }
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 7, , 8]);
                    client = (0, Discord_1.FetchDiscordClient)();
                    channel = client.channels.cache.get(Project.channel.value);
                    if (!(channel === null || channel === void 0 ? void 0 : channel.isText())) return [3 /*break*/, 6];
                    return [4 /*yield*/, channel.send({ embeds: [exampleEmbed] })["catch"](function (e) { return console.log(e); })];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    e_1 = _b.sent();
                    console.log(e_1);
                    return [3 /*break*/, 8];
                case 8:
                    res.status(200).json({
                        success: true
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = checkDiscordGuild;

"use strict";
exports.__esModule = true;
exports.FetchDiscordClient = exports.StartDiscord = void 0;
var discord_js_1 = require("discord.js");
var DISCORD_CLIENT = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MEMBERS] });
function StartDiscord() {
    return new Promise(function (resolve) {
        DISCORD_CLIENT.on('ready', function () {
            console.log("Logged in as ".concat(DISCORD_CLIENT.user.tag, "!"));
            DISCORD_CLIENT.user.setActivity("logistics.rovolution.me", { type: 'LISTENING' });
            resolve();
        });
        DISCORD_CLIENT.login(process.env.DISCORD_TOKEN);
    });
}
exports.StartDiscord = StartDiscord;
function FetchDiscordClient() {
    return DISCORD_CLIENT;
}
exports.FetchDiscordClient = FetchDiscordClient;

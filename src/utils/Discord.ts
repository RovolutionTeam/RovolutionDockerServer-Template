import axios from 'axios';
import { Client, Intents } from 'discord.js';

const DISCORD_CLIENT = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

export function StartDiscord() {
    return new Promise<void>((resolve) => {
        DISCORD_CLIENT.on('ready', () => {
            console.log(`Logged in as ${DISCORD_CLIENT.user.tag}!`);
            DISCORD_CLIENT.user.setActivity(`logistics.rovolution.me`, { type: 'LISTENING' });
            resolve();
        });


        DISCORD_CLIENT.login(process.env.DISCORD_TOKEN);
    });
}

export function FetchDiscordClient() {
    return DISCORD_CLIENT;
}

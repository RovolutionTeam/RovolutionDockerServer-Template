import { spawn } from 'child_process';
import { FetchMongo } from './Mongodb';

let mainjson = {
    // Tricks Cloudflared tunnel to think this one run in the terminal and not as a child proccess
    PATH: '/usr/local/bin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin:/Users/harvey/Library/Android/sdk/emulator:/Users/harvey/Library/Android/sdk/platform-tools',
}


export async function setupTunnel() {

    // Required cloudflared binary
    const data = spawn(`cloudflared`, [`tunnel`, `--url`, `http://localhost:${process.env.PORT}`], { env: mainjson });

    data.on('error', (e) => {
        console.log(e);
    })


    //For some reason it uses the error output :shrug:
    data.stderr.on('data', async (e) => {

        // Regex to get the tunnel url
        let out = e.toString().match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/g)
        if (out) {
            console.log(out[0])
            try {
                await (await FetchMongo()).db("Rovolution-Utils").collection("Tunnels").updateOne({ name: process.env.TUNNEL_NAME }, { $set: { url: out[0] } }, { upsert: true });
                console.log("Tunnel URL set");
            } catch {
                console.log("Error setting tunnel url");
            }
        }
    })

    return;
};
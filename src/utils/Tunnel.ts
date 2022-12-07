import localtunnel from 'localtunnel';
import { FetchMongo } from './Mongodb';

export async function setupTunnel() {

    const tunnel = await localtunnel({ port: parseInt(process.env.PORT, 10) });

    try {
        await (await FetchMongo()).db("Rovolution-Utils").collection("Tunnels").updateOne({ name: process.env.TUNNEL_NAME }, { $set: { url: tunnel.url } }, { upsert: true });
        console.log("Tunnel URL set");
    } catch {
        console.log("Error setting tunnel url");
    }

    tunnel.on('close', () => {
        setupTunnel();
    });
};
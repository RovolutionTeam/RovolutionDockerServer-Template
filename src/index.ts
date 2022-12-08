// Simpled local tunnel webserver, for Rovolution
// https://www.github.com/Gerald12344

import { StartDiscord } from './utils/Discord';
import { StartExpress } from './utils/Express';
import { config } from 'dotenv';
import { readdirSync } from 'fs';
import { Request, Response } from 'express';
import { startScheduler } from './tasks/scheduler';
import StartMongoDb from './utils/Mongodb';
import { setupTunnel } from './utils/Tunnel';

config();
startScheduler();
StartMongoDb();

let _routes = __dirname + '/routes';

StartDiscord().then(() => {
    let app = StartExpress() as any;
    setupTunnel();

    // Sneaky route exposer :)
    readdirSync(_routes).forEach((file) => {
        import(`${_routes}/${file}`).then((x) => {
            app[x.method ?? 'get']('/' + file.replace('.js', ''), async (req: Request, res: Response) => {
                try {
                    await x.default(req, res);
                } catch (e) {
                    console.log(e);
                    try {
                        res.status(500).json({
                            message: 'Internal Server Error',
                            success: false,
                        });
                    } catch { }
                }
            });
        });
    });
});

// Simpled local webserver, for Rovolution
// https://www.github.com/Gerald12344

import { StartDiscord } from './utils/Discord';
import { StartExpress } from './utils/Express';
import { config } from 'dotenv';
import { lstatSync, readdirSync } from 'fs';
import { Request, Response, json } from 'express';
import { startScheduler } from './tasks/scheduler';
import StartMongoDb from './utils/Mongodb';
import { Logger } from './utils/Logger';

config();
startScheduler();
StartMongoDb();

let _routes = __dirname + '/routes';


let app = StartExpress() as any;
app.use(json());

let GenerateFolderRoutes = (previousString: string, dir: string) => {
    readdirSync(dir).forEach((file) => {
        if (lstatSync(dir + "/" + file).isDirectory()) GenerateFolderRoutes(`${previousString}/${file}`, `${dir}/${file}`);

        if (file.split('.').pop() !== 'js') return;

        import(`${dir}/${file}`).then((x) => {
            app[x?.method ?? 'get'](previousString + '/' + file.replace('.js', ''), async (req: Request, res: Response) => {
                Logger("Incoming Request: " + previousString + '/' + file.replace('.js', ''))

                try {
                    await x.default(req, res);
                } catch (e) {
                    try {
                        res.status(500).json({
                            message: 'Internal Server Error',
                            success: false,
                        });
                        console.log(e)
                    } catch { }
                }
            });
        });
    });
}

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'OK',
    })
});

StartDiscord().then(async () => {


    // Sneaky route exposer :)

    // I hate but love recursion
    GenerateFolderRoutes("", _routes);
});


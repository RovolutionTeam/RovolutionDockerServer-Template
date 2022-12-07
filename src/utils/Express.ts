import express from 'express';

const EXPRESS_GLOBAL = express();

export function StartExpress() {
    EXPRESS_GLOBAL.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    });

    return EXPRESS_GLOBAL;
}

export function GetExpressGlobal() {
    return EXPRESS_GLOBAL;
}

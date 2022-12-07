import { MongoClient } from 'mongodb';

let MongoPromise: MongoClient = null;

export default function StartMongoDb() {
    let client = new MongoClient(process.env.MONGO_URI);
    client.connect(function (err, client) {
        if (err) throw err;
        MongoPromise = client;
    });
}

export function Wait() {
    return new Promise((resolve) => {
        let interval = setInterval(() => {
            if (MongoPromise !== null) {
                clearInterval(interval);
                resolve(0);
            }
        }, 1000);
    });
}

export async function FetchMongo() {
    if (MongoPromise === null) {
        await Wait();
    }
    return MongoPromise;
}

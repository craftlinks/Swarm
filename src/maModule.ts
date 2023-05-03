import sqlite3 from 'sqlite3';

export const myPromise: Promise<number> = new Promise((resolve, reject) => {
    // random positive integer number
    const randomNumber: number = Math.floor(Math.random() * 100) + 1;
    // if even number
    if (randomNumber % 2 === 0) {
        resolve(randomNumber);
        // if odd number
    } else {
        reject(randomNumber);
    }
});

export async function maPromise(): Promise<void> {
    const result = myPromise.then((randomNumber: number) => {
        console.log(`Even number: ${randomNumber}`);
        return randomNumber;
    }).catch((randomNumber: number) => {
        console.log(`Odd number: ${randomNumber}`);
        return randomNumber;
    });

    const number = await result;
    console.log(`Double Number: ${number * 2}`);
}

export function maTableCallbackVersion(callback: (err: any, value: any) => void) {
    console.log("Using callback version:");

    // Open a new SQLite database connection
    const db = new sqlite3.Database(':memory:', () => console.log(" db opened."));
    db.serialize(() => {
        try {
            // Run a SQL query to create a table called "maTable"
            db.run('CREATE TABLE maTable (id INTEGER PRIMARY KEY, name TEXT)', () => console.log("  table created."));

            // Close the database connection
            db.close(() => {
                console.log("    db closed.");
                callback(null, null);
            });
            // throw an error on purpose
            throw new Error("Error");
        } catch (err) {
            callback(err, null)
        }

    });

}


export async function maTablePromiseVersion() {
    console.log("Using promise version:");

    function openDatabase(): Promise<sqlite3.Database> {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(':memory:', (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log(" db opened.");
                resolve(db);
            });
            return db;
        });
    }

    function dbRunPromise(db: sqlite3.Database, sql: string, message: string): Promise<void> {
        return new Promise((resolve, reject) => {
            db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log(message);
                resolve();
            });
        });
    }

    function dbClosePromise(db: sqlite3.Database): Promise<void> {
        return new Promise((resolve, reject) => {
            db.close((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log("    db closed.");
                resolve();
            });
        });
    }

    const db = await openDatabase().catch((err) => console.log(err));
    if (db) {
        await dbRunPromise(db, 'CREATE TABLE maTable (id INTEGER PRIMARY KEY, name TEXT)', '  table created.').catch((err) => console.log(err));
        await dbClosePromise(db).catch((err) => console.log(err));
    }



}

export function bigNumberArray(length: number): number[] {
    let bigArray: number[] = Array < number > (length);
    for (let i = 0; i < length; i++) {
        bigArray[i] = i;
    }
    return bigArray;
}

export async function findNumber(array: number[], number: number){
    let promises: Promise<boolean>[] = array.map((value) => {
        const promise: Promise<any> = new Promise((resolve, reject) => {
            // resolve if value is even, reject if odd
            if (value === number) {
                resolve(null);
            } else {
                reject(null);
            }
        });
        return promise.then(() => true, () => false);
    });
    // wait for all promises to resolve, then return the index of the resolved promise with true value
    return await Promise.all(promises).then((results) => {
        let index: number = -1;
        results.forEach((value, i) => {
            if (value) {
                index = i;
            }
        });
        return index;

    }).catch((err) => console.log(err));
}


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

export function maTableCallbackVersion() {
    console.log("Using callback version:");

    // Open a new SQLite database connection
    const db = new sqlite3.Database(':memory:', () => console.log(" db opened."));

// Run a SQL query to create a table called "maTable"
    db.run('CREATE TABLE maTable (id INTEGER PRIMARY KEY, name TEXT)', () => console.log("  table created."));

// Close the database connection
    db.close(() => console.log("    db closed."));
}
import {maPromise, maTableCallbackVersion, maTablePromiseVersion} from "./maModule";

function maTableCallbackVersionPromise(): Promise<void> {
    return new Promise((resolve, reject) => {
        maTableCallbackVersion((err, value) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

async function main() {
    await maPromise();
    await maTablePromiseVersion();
    maTableCallbackVersionPromise().then(() => console.log("That's all folks!")).catch((err) => console.log("That's an error, Folks:\n" + err));
}

main();

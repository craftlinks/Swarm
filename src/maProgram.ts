import {maPromise, maTableCallbackVersion} from "./maModule";

async function main() {
    await maPromise();
    maTableCallbackVersion();
}

main();

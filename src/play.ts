import {setTimeout} from "timers";

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


function create_array(): number[] {
    const myArray = [];
    const arraySize = 100;

    for (let i = 0; i < arraySize; i++) {
        myArray.push(i);
    }
    console.log(myArray);
    return myArray;
}

let bigOak = require("./crow-tech").bigOak;

function setTimeoutPromise(ms: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
        setTimeout(() => resolve(ms), ms);
    });
}

function request(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        let done = false;

        function attempt(n: number) {
            req.open('GET', url);
            req.send(null);
            setTimeoutPromise(250).then(() => {
                if (done) return;
                else if (n < 3) attempt(n + 1);
                else {
                    req.abort()
                    reject(Error("max attempts exceeded"));
                }
            });
        }

        const req = new XMLHttpRequest();

        req.onload = () => {
            done = true;
            if (req.status === 200) {
                resolve("hello");
            } else {
                reject(Error("Oops"));
            }
        };
        req.onerror = () => {
            done = true;
            reject(Error('Network Error'));
        };

        attempt(1);
    });

}

function main() {
    const array: number[] = create_array();
    const ms = 500
    setTimeout(() => console.log(ms), ms);
    const timeout = setTimeoutPromise(ms);
    timeout.then(value => console.log(`Got ${value}`));


    let fifteen: Promise<number> = Promise.resolve(15);
    fifteen.then(value => console.log(`Got ${value}`));

    request('https://eloquentjavascript.net/11_async.html').then(value => console.log(`Got ${value}`)).catch(error => console.log(error));

}

main();
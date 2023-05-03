import {bigNumberArray} from "./maModule.ts";

function main() {
    const myArray: number[] = bigNumberArray(100);
    // map over array elements
    let promises: Promise<boolean>[] = myArray.map((value) => {
        const promise: Promise<any> = new Promise((resolve, reject) => {
            // resolve if value is even, reject if odd
            if (value % 2 === 0) {
                resolve(null);
            } else {
                reject(null);
            }
        });
        return promise.then(() => true, () => false);
    });
    // wait for all promises to resolve, then split in 2 arrays for even and odd numbers
    Promise.all(promises).then((results) => {
        let evenNumbers: number[] = [];
        let oddNumbers: number[] = [];
        console.log(results);
        results.forEach((value, index) => {
            if (value) {
                evenNumbers.push(myArray[index]);
            } else {
                oddNumbers.push(myArray[index]);
            }
        });
        console.log(`Odd numbers: ${oddNumbers}`);
        console.log(`Even numbers: ${evenNumbers}`);

    }).catch((err) => console.log(err));
}

main();
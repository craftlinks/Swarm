import {bigNumberArray, findNumber} from "./maModule.ts";

async function main() {
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
    let result = await Promise.all(promises).then((results) => {
        let evenNumbers: number[] = [];
        let oddNumbers: number[] = [];
        results.forEach((value, index) => {
            if (value) {
                evenNumbers.push(myArray[index]);
            } else {
                oddNumbers.push(myArray[index]);
            }
        });
        return {evenNumbers, oddNumbers};

    }).catch((err) => console.log(err));

    let even_numbers = result?.evenNumbers;
    let odd_numbers = result?.oddNumbers;
    let number = 47;
    odd_numbers ? findNumber(odd_numbers,number).then(index => {if (index != -1) console.log(`Odd numbers, Index of ${number}: ` + index)}).catch((err) => console.log(err)) : console.log("odd_numbers is undefined");
    even_numbers ? findNumber(even_numbers,number).then(index => {if (index != -1) console.log(`Even numbers, index of ${number}: ` + index)}).catch((err) => console.log(err)) : console.log("even_numbers is undefined");

    // use async generator function to iterate over array elements


}

main();
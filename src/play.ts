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

export async function main(): Promise<void> {
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

main().then(() => {
});
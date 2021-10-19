const readline = require('readline');

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let validated = false
let count = 0;

(async () => {
    while (!validated && count < 5) {
        count++

        let answer = await new Promise(resolve => {
            reader.question("Please enter your password for validation, it must be at least 10 characters: ", function (input) {
                resolve(input)
            });
        })
        if (answer.length >= 10) {
            console.log("Congratulations.  Your password meets the specified length requirement.")
            validated = true
            reader.close()
        } else if (answer.length < 10) {
            console.log("Unfortunately, your password does not meet the specified length requirement of at least 10 characters.");
            if (count >= 5) {
                console.log('Too many attempts, you are locked out FOREVER!')
                reader.close()
            }
        }
    }
})();


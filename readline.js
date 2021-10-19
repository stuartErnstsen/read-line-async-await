const readline = require('readline');

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//Initializing variables that will be used to escape our loop either when a valid password is entered or 5 attempts have been made. 
let validated = false
let attemptCount = 0;

//Creating and IIFE to allow us to use async/await on the global level of our file
(async () => {
    while (!validated && attemptCount < 5) {
        //Counting each user attempt
        attemptCount++

        //Creating a promise to force JS to await the response from the user
        //Saving the users response into the answer variable after promise has resolved(After user has submitted their input)
        let answer = await new Promise(resolve => {
            reader.question("Please enter your password for validation, it must be at least 10 characters: ", function (input) {
                //Promise is not resolved until resolve function is invoked as below
                resolve(input)
            });
        })
        if (answer.length >= 10) {
            console.log("Congratulations.  Your password meets the specified length requirement.")
            //Stopping loop by setting validated to true and closing the reader so node process in the terminal is terminated. 
            validated = true
            reader.close()
        } else if (answer.length < 10) {
            console.log("Unfortunately, your password does not meet the specified length requirement of at least 10 characters.");
            if (attemptCount >= 5) {
                //Console logging when too many attempts have been made and closing the reader so node process will terminate after loop is done. 
                console.log('Too many attempts, you are locked out FOREVER!')
                reader.close()
            }
        }
    }
})();


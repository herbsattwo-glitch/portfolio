// Generate a RANDOM secret number between 1 and 20
// Math.random() gives 0–0.999...
// Multiply by 20 → 0–19.999...
// Math.floor removes decimals → 0–19
// +1 shifts it to 1–20
var secret = Math.floor(Math.random() * 20) + 1;

// This function runs every time the user clicks the "Guess" button
function checkGuess() {

    // Get the value from the input box
    var guessInput = document.getElementById("guessInput");

    // Convert the input value from text to a number
    var guess = parseInt(guessInput.value);

    // Get the paragraph where messages will be shown
    var message = document.getElementById("message");

    // If the guess matches the secret number
    if (guess === secret) {
        message.textContent = "Correct Guess!";
        message.className = "correct";

    // If the guess is smaller than the secret
    } else if (guess < secret) {
        message.textContent = "Incorrect, too low";
        message.className = "low";

    // If the guess is bigger than the secret
    } else if (guess > secret) {
        message.textContent = "Incorrect, too high";
        message.className = "high";
    }
}

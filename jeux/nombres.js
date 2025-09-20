let secretNumber;
let attempts = 7; // Nombre d'essais maximum
let message = document.getElementById("message");
let guessInput = document.getElementById("guess");
let guessButton = document.getElementById("guessButton");
let replayButton = document.getElementById("replayButton");

function initializeGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1; // Nombre aléatoire entre 1 et 100
    attempts = 7;
    message.textContent = "Devinez le nombre secret entre 1 et 100 !";
    guessInput.value = "";
    guessInput.disabled = false;
    guessButton.disabled = false;
    replayButton.style.display = "none";
}

function checkGuess() {
    let guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = "Veuillez entrer un nombre valide entre 1 et 100.";
        return;
    }

    if (guess === secretNumber) {
        message.textContent = `Bravo, vous avez trouvé le nombre ${secretNumber} en ${7 - attempts + 1} essais !`;
        guessInput.disabled = true;
        guessButton.disabled = true;
        replayButton.style.display = "block";
    } else {
        attempts--;
        if (guess < secretNumber) {
            message.textContent = "Trop bas !";
        } else {
            message.textContent = "Trop haut !";
        }

        if (attempts === 0) {
            message.textContent = `Vous avez perdu, le nombre secret était ${secretNumber} !`;
            guessInput.disabled = true;
            guessButton.disabled = true;
            replayButton.style.display = "block";
        }
    }
}

function rejouer() {
    initializeGame();
}

guessButton.addEventListener("click", checkGuess);
replayButton.addEventListener("click", rejouer);

initializeGame();
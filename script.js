const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const resetButton = document.getElementById('resetButton');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const levelInfo = document.getElementById('levelInfo');

let secretNumber;
let attempts;
let gameOver;
let level;
let maxNumber;

function initGame() {
    level = 1;
    maxNumber = 100;
    resetLevel();
}

function resetLevel() {
    secretNumber = Math.floor(Math.random() * maxNumber) + 1;
    attempts = Math.max(10 - level, 3); // Reduce attempts as level increases, minimum 3
    gameOver = false;
    guessInput.value = '';
    guessInput.disabled = false;
    guessButton.disabled = false;
    resetButton.style.display = 'none';
    feedback.textContent = '';
    updateLevelInfo();
    updateAttemptsDisplay();
}

function updateLevelInfo() {
    levelInfo.textContent = `Level: ${level}`;
}

function updateAttemptsDisplay() {
    attemptsDisplay.textContent = `You have ${attempts} attempts left.`;
}

function handleGuess() {
    if (gameOver) return;

    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > maxNumber) {
        feedback.textContent = `Please enter a valid number between 1 and ${maxNumber}.`;
        return;
    }

    attempts--;
    updateAttemptsDisplay();
    console.log(secretNumber)
    if (guess === secretNumber) {
        levelUp();
    } else if (attempts === 0) {
        endGame(`Game over! The secret number was ${secretNumber}. You reached level ${level}.`);
    } else if (guess < secretNumber) {
        feedback.textContent = 'Too low! Try a higher number.';
    } else {
        feedback.textContent = 'Too high! Try a lower number.';
    }

    guessInput.value = '';
}

function levelUp() {
    level++;
    maxNumber = Math.min(maxNumber + 50, 1000); // Increase max number, cap at 1000
    feedback.textContent = `Congratulations! You've advanced to level ${level}!`;
    setTimeout(() => {
        resetLevel();
    }, 2000);
}

function endGame(message) {
    feedback.textContent = message;
    gameOver = true;
    guessInput.disabled = true;
    guessButton.disabled = true;
    resetButton.style.display = 'inline-block';
}

guessButton.addEventListener('click', handleGuess);
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleGuess();
    }
});
resetButton.addEventListener('click', initGame);

initGame();
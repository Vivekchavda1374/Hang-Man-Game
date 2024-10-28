const worddisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangman = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector(".button"); // Corrected variable name

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  hangman.src = "hangman-0.svg";
  guessesText.innerText = `${wrongGuessCount}/${maxGuesses}`;
  worddisplay.innerHTML = "";
  currentWord.split("").forEach(letter => {
    const li = document.createElement("li");
    li.textContent = "_";
    li.classList.add("letter");
    worddisplay.appendChild(li);
  });
  keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
  gameModal.classList.remove("show");
}

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word.toLowerCase();
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
}

const gameOver = (isVictory) => {
  const modalText = isVictory ? "You Found The Word :" : "The Correct Word was :";
  gameModal.querySelector("img").src = `${isVictory ? "victory" : "lost"}.gif`;
  gameModal.querySelector("h4").innerText = isVictory ? "Congratulations" : "Game Over";
  gameModal.querySelector("p").innerHTML = `${modalText}<b>${currentWord}</b>`;
  gameModal.classList.add("show");
};

const initGame = (button, clickLetter) => {
  if (currentWord.includes(clickLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickLetter) {
        correctLetters.push(letter);
        worddisplay.querySelectorAll("li")[index].innerText = letter;
        worddisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    hangman.src = `hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount}/${maxGuesses}`;
  }
  button.disabled = true;
  if (wrongGuessCount === maxGuesses) {
    gameOver(false);
  }
  if (correctLetters.length === currentWord.length) {
    gameOver(true);
  }
}

for (let i = 97; i < 123; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i).toUpperCase(); 
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord()); 

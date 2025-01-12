document.addEventListener("DOMContentLoaded", (event) => {
  const showGuessWord = document.querySelector(".guess-word p");
  const inputsForWords = document.querySelector(".inputs-for-words");
  const randomBtn = document.querySelector("button.random");
  const resetBtn = document.querySelector("button.reset");
  const showMistakes = document.querySelector(".show-mistakes");
  const currentTry = document.querySelector(".current-try");
  const ListItemsTries = document.querySelectorAll(".tries li");

  const words = [
    "airplane",
    "boat",
    "baby",
    "ears",
    "scissors",
    "cough",
    "cold",
    "phone",
    "laugh",
    "blink",
    "sneeze",
    "spin",
    "hammer",
    "book",
    "phone",
    "jump",
    "clap",
    "slap",
    "birthday",
    "president",
    "apartment",
    "cradle",
    "coffee",
    "waterfall",
    "window",
    "proud",
    "flashlight",
    "overwhelm",
    "judge",
  ];
  let userWord = "";
  let currentWord = "";
  let currentWordScrambled = "";
  let tries = 0;
  let mistakes = 0;

  function scrambleWord(word) {
    let scrambled = word.split(""); // Split the word into an array of characters
    for (let i = scrambled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index
      [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]]; // Swap characters
    }
    currentWordScrambled = scrambled.join("");
    return currentWordScrambled; // Join the array back into a string
  }

  function createInputFields(length) {
    let inputsHTML = "";
    for (let i = 1; i <= length; i++) {
      if (i === 1) {
        inputsHTML += `<input type="text" class="input-word" data-input-number="${i}" maxlength="1" autofocus/>`;
      } else {
        inputsHTML += `<input type="text" class="input-word" data-input-number="${i}" maxlength="1" disabled/>`;
      }
    }
    inputsForWords.innerHTML = inputsHTML;
    const inputWordFields = inputsForWords.querySelectorAll(".input-word");
    inputWordFields.forEach((input) => {
      input.addEventListener("input", handleInput);
    });
  }

  function generateRandomWord() {
    userWord = "";
    currentWord = "";
    currentWordScrambled = "";
    tries = 0;
    mistakes = 0;
    currentTry.innerHTML = tries;
    ListItemsTries.forEach((li) => {
      li.classList.remove("failed");
    });
    showMistakes.innerHTML = "";
    const randomNum = Math.floor(Math.random() * 29);
    currentWord = words[randomNum];
    showGuessWord.innerHTML = scrambleWord(words[randomNum]);
    createInputFields(currentWord.length);
  }

  function findMismatchIndex(str1, str2) {
    if (str1.length !== str2.length) {
      throw new Error("Strings must be of the same length.");
    }
    // Loop through both strings and find the first mismatch
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] !== str2[i]) {
        return i; // Return the index where they first differ
      }
    }
    return -1; // Return -1 if the strings are completely identical
  }

  function handleInput(e) {
    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");
    let currentInputNo = Number(e.target.dataset.inputNumber);
    if (e.target.value) {
      userWord += e.target.value;
      if (currentInputNo + 1 <= currentWord.length) {
        e.target.disabled = true;
        const nextInput = document.querySelector(
          `input[data-input-number*="${currentInputNo + 1}"]`
        );
        nextInput.disabled = false;
        nextInput.focus();
      } else {
        e.target.disabled = true;
        const differAt = findMismatchIndex(userWord, currentWord);
        if (differAt !== -1) {
          showMistakes.innerHTML = userWord.slice(differAt);
          tries++;
          currentTry.innerHTML = tries;
        } else {
          document.querySelector(".successAlert").classList.remove("hidden");
          setTimeout(() => {
            document.querySelector(".successAlert").classList.add("hidden");
            generateRandomWord();
          }, 2000);
        }
      }
    }
  }

  generateRandomWord();
  randomBtn.addEventListener("click", generateRandomWord);
  resetBtn.addEventListener("click", generateRandomWord);
}); //document ready

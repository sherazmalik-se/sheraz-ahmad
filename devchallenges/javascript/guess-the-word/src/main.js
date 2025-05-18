import { scrambleWord } from "./scrambleWord.js";
import { createInputFields } from "./createInputFields.js";
import { findMismatchIndex } from "./findMismatchIndex.js";
document.addEventListener("DOMContentLoaded", (event) => {
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
  const inputsWrapper = document.querySelector(".inputs-wrapper");
  const showScrambledWord = document.querySelector(".scrambled-word p");
  const currentTry = document.querySelector(".current-try");
  const triesListItems = document.querySelectorAll(".tries li");
  const showMistakes = document.querySelector(".show-mistakes");
  const randomBTN = document.querySelector(".random");
  const resetBTN = document.querySelector(".reset");

  // let inputs;
  let userWord = "";
  let currentWord = "";
  let currentWordScrambled = "";
  let tries = 0;

  function manageTries(count) {
    currentTry.innerHTML = count;
    triesListItems.forEach((triesListItem) => {
      triesListItem.classList.remove("failed");
    });

    for (let i = 1; i <= count; i++) {
      document.querySelector(".try-" + i).classList.add("failed");
    }
  }

  function resetInputs(inputsCreated) {
    inputsWrapper.innerHTML = inputsCreated; //all inputs single string
    let inputs = inputsWrapper.querySelectorAll(".input-word"); //all inputs seperated via array
    inputs.forEach((input) => {
      input.addEventListener("input", handleInput);
      if (input.dataset.inputNumber === "1") {
        input.focus(); //get the focus on first input field
      }
    });
  }

  function generateRandomWord(providedWord) {
    tries = 0;
    userWord = "";
    if (providedWord === "relowf") {
      currentWord = "flower";
      currentWordScrambled = "relowf";
    } else {
      currentWord = words[Math.floor(Math.random() * 29)];
      currentWordScrambled = scrambleWord(currentWord);
    }

    manageTries(0);
    showScrambledWord.innerHTML = currentWordScrambled;
    resetInputs(createInputFields(currentWord.length));
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
          manageTries(tries);
          resetInputs(createInputFields(currentWord.length));
          userWord = "";
          if (tries > 4) {
            document.querySelector(".failureAlert").classList.remove("hidden");
            setTimeout(() => {
              document.querySelector(".failureAlert").classList.add("hidden");
              generateRandomWord();
            }, 2000);
            showMistakes.innerHTML = "";
            return;
          }
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

  /* setInterval(() => {
    const inputFields = document.querySelectorAll("input");
    const enabledInputFields = Array.from(inputFields).filter(
      (input) => !input.disabled
    );
    enabledInputFields[0].focus();
  }, 100); */

  generateRandomWord("relowf");
  randomBTN.addEventListener("click", generateRandomWord);
  resetBTN.addEventListener("click", generateRandomWord);
}); //document ready

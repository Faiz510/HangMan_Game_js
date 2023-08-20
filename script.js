"use strict ";

const buttons = document.querySelector(".buttons");
const hintCon = document.querySelector(".hint");
const GuessCountCon = document.querySelector(".Incorrect_no");
const WordAnsCon = document.querySelector(".ans");
const Img = document.querySelector(".images_container img");
const modal = document.querySelector(".modal");
const modalTxt = document.querySelector(".modal_text");
const modalBtn = document.querySelector(".play_again_btn");
const overlay = document.querySelector(".overlay");
const playAgainBtn = document.querySelector(".play_again_btn");

let corWord = "";
let totalGuessNo = 6;
let IncorrectGuess = 0;
class App {
  // Array
  wordsWithHints = [
    {
      word: "Dance",
      hint: "A rhythmic movement of the body often performed to music.",
    },
    {
      word: "Guitar",
      hint: "A musical instrument with strings, typically played with fingers or a pick.",
    },
    {
      word: "Sunflower",
      hint: "A tall plant with large yellow flowers that follow the direction of the sun.",
    },
    {
      word: "Chocolate",
      hint: "A sweet treat made from cacao beans, loved by many people.",
    },
    {
      word: "Elephant",
      hint: "A large mammal with a long trunk and tusks, native to Africa and Asia.",
    },
    {
      word: "Adventure",
      hint: "An exciting and daring experience, often involving risks and unknown outcomes.",
    },
    {
      word: "Incredible",
      hint: "Unbelievable or extraordinary, beyond what is considered ordinary.",
    },
    {
      word: "Galaxy",
      hint: "A vast system of stars, gas, dust, and other celestial objects.",
    },
    {
      word: "Pizza",
      hint: "A popular dish consisting of a flat, round base with various toppings.",
    },
    {
      word: "Rainbow",
      hint: "A beautiful, multicolored arc in the sky, caused by light refraction in water droplets.",
    },
  ];

  constructor() {
    this.events();
  }

  events() {
    this.createAplabetBtns();
    // window.addEventListener(
    //   "DOMContentLoaded",
    //   this.creatingAplabetFunction.bind(this)
    // );
    this.creatingAplabetFunction();
    this.mainLogic();

    this.creatingWordsFunction();

    playAgainBtn.addEventListener("click", this.playAgain.bind(this));
    // this.timer();
  }

  // methods
  mainLogic() {
    const randGuess = Math.floor(Math.random() * this.wordsWithHints.length);
    const randWord = this.wordsWithHints[randGuess].word.toLowerCase();
    const randHint = this.wordsWithHints[randGuess].hint;
    console.log(randWord);
    0;
    // for displaying hint
    this.displayingHintFunction(randHint);

    // making corWord = to randWord to access from outside of function
    corWord = randWord;
  }
  // creating aplhabetic btns
  createAplabetBtns() {
    for (let i = 65; i <= 90; i++) {
      const alpha = String.fromCharCode(i);
      //   getting btns for function
      buttons.insertAdjacentHTML(
        "beforeend",
        `<button data-alpha=${alpha} class="btn"> ${alpha} </button`
      );
      //   when reachs 72 from 65 i want br
      if (i == 72) buttons.insertAdjacentHTML("beforeend", "<br>");

      //   when reachs 85 from 65 i want br
      if (i == 85) buttons.insertAdjacentHTML("beforeend", "<br>");
    }
  }

  // creating ans word in with span tag and showing each alphabetic in each span
  creatingWordsFunction() {
    for (let i = 0; i < corWord.length; i++) {
      WordAnsCon.insertAdjacentHTML(
        "beforeend",
        `<span class="wordIndex word-${corWord[i]}" data-wordI=${corWord[i]}> </span>`
      );
    }
  }

  // creating alphabetes that are availble
  creatingAplabetFunction() {
    ///////////////////
    // gettting aplhabetic function
    document
      .querySelectorAll(".btn")
      .forEach((btn) =>
        btn.addEventListener("click", (e) => this.gettingAlphaFunction(e))
      );
  }

  //   checking alphabetics keys
  gettingAlphaFunction(e) {
    // getting aplha val form btn when it clicke data set in lowerCase()
    const targetEl = e.target;
    const btndata = e.target.dataset.alpha; // dataset includes the alphabet value
    const btnDataVal = btndata.toLowerCase(); // making it lower case

    // adding style when clicked
    this.afterBtnClickedStyledFunction(targetEl);

    // if main Correct ans has the alphabete which targetEl has
    // checking if the  ans is rigth or wrong
    corWord.includes(btnDataVal)
      ? this.CorrectGuessFunction(btnDataVal)
      : this.IncorrectGuessFunction();
  }

  IncorrectGuessFunction() {
    IncorrectGuess++;

    if (IncorrectGuess >= totalGuessNo) {
      this.displayingModal("oh no ! You loose the game");
      IncorrectGuess = 0;
    }

    this.displayingIncorrectValConFunction();

    this.displayingImgFunction(IncorrectGuess);
  }

  CorrectGuessFunction(dataval) {
    document.querySelectorAll(".wordIndex").forEach((wordInd) => {
      if (wordInd.classList.contains(`word-${dataval}`)) {
        document
          .querySelectorAll(`.word-${dataval}`)
          .forEach((val) => this.displayStyleOnCorrectGuess(val, dataval));
      }

      this.checkWinGame();

      // this.displayingModal("Congrats You win the Game");
    });
  }

  //   hint display function
  displayingHintFunction(hintVal) {
    hintCon.innerHTML = `Hint : ${hintVal}`;
  }

  displayingIncorrectValConFunction() {
    GuessCountCon.innerHTML = IncorrectGuess;
  }

  displayingImgFunction(incNo) {
    Img.src = `/images/hangman-${incNo}.svg`;
  }

  // when clicked on btn styled btn after cliced
  afterBtnClickedStyledFunction(el) {
    el.style.opacity = "0.5";
    el.style.pointerEvents = "none";
  }

  displayStyleOnCorrectGuess(v, dval) {
    v.textContent = dval.toUpperCase();
    // v.style.borderBottom = "none";
    v.classList.add("hideWord");
  }

  checkWinGame() {
    const wordLetters = corWord.split("");
    const guessedLetters = [];

    document.querySelectorAll(".wordIndex").forEach((wordInd) => {
      const letter = wordInd.textContent.toLowerCase();
      if (letter !== "") {
        guessedLetters.push(letter);
      }
    });

    if (wordLetters.every((letter) => guessedLetters.includes(letter))) {
      this.displayingModal("Congrats You win the Game");
      // this.restartGame();
    }
  }

  displayingModal(text) {
    modal.classList.add("showMadal");
    overlay.classList.add("showMadal");
    modalTxt.textContent = `${text}`;
  }

  restartGameLogic() {
    // location.reload();
    WordAnsCon.innerHTML = "";
    IncorrectGuess = 0;
    // hiding modal
    modal.classList.remove("showMadal");
    overlay.classList.remove("showMadal");
    // console.log(corWord);
    // getting word and hints again
    this.mainLogic();
    // generating ans  word
    this.creatingWordsFunction();
    // removing clicked clases from btns
    document.querySelectorAll(".btn").forEach((cl) => {
      cl.style.opacity = "1";
      cl.style.pointerEvents = "all";
    });
  }

  playAgain() {
    this.restartGameLogic();
  }
}

const app = new App();

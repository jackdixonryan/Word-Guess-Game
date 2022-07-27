class Hangman {
  constructor(list) {
    if (!list) {
      throw new Error("list is required.");
    }
    if (!Array.isArray(list)) {
      throw new Error("The list must be an array.");
    }
    if (list.length === 0) {
      throw new Error("The list must contain at least one string.");
    }
    if (list.some(item => typeof item !== "string")) {
      throw new Error("The list must contain strings.");
    }
    this.list = list;
    this.currentWord = null;
    this.chooseElement();

    this.guesses = 0;
    this.wins = 0;
    this.losses = 0;
    this.maxGuesses = 10;
    this.isStarted = true;
  }

  start() { 
    this.isStarted = true;
    this.chooseElement();
    this.guesses = 0;
  }

  stop() {
    this.isStarted = false;
  }

  guess(char) {
    if (typeof char !== "string") {
      throw new Error("char must be a string.");
    }

    if (char.length !== 1) {
      throw new Error("char must be a single character.");
    }

    if (!this.isStarted) {
      throw new Error("The game is not started.");
    }
    char = char.toLowerCase();
    this.currentWord.guess(char);
    this.guesses++;

    if (this.currentWord.isSolved) {
      this.endRound();
    }
    if (this.guesses === this.maxGuesses) {
      this.endRound();
    }
  }

  chooseElement() {
    const randomIndex = Math.floor(Math.random() * this.list.length);
    const word = this.list[randomIndex];
    if (this.currentWord && this.currentWord.word === word && this.list.length > 1) {
      return this.chooseElement();
    } else {
      this.currentWord = new GuessableWord(word);
    }
  }

  endRound() {
    if (this.currentWord.isSolved) {
      this.wins++;
      this.stop();
    } else {
      this.losses++;
      this.stop();
    }
  }
}

class GuessableWord { 
  constructor(word) {
    if (!word) {
      throw new Error("word is required.");
    }
    if (typeof word !== "string") {
      throw new Error("The word must be a string.");
    }

    this.word = word;
    this.solution = new Array(word.length).fill(null);
    this.lastGuess = null;
    this.allGuesses = [];
    this.isSolved = false;
  }

  guess(char) {
    if (typeof char !== "string") {
      throw new Error("char must be a string.");
    }

    if (char.length !== 1) {
      throw new Error("char must be a single character.");
    }
    char = char.toLowerCase();
    if (this.allGuesses.includes(char)) {
      throw new Error("No duplicate guesses.");
    }

    this.lastGuess = char;
    this.allGuesses.push(char);
    if (this.word.includes(char)) {
      for (let i = 0; i < this.word.length; i++) {
        const character = this.word[i];
        if (character === char) {
          this.solution[i] = character;
        }
      }
    }

    if (this.solution.every(item => item !== null)) {
      this.isSolved = true;
    }
  }

  reset() {
    this.allGuesses = [];
    this.lastGuess = null;
    this.solution = new Array(this.word.length).fill(null);
    this.isSolved = false;
  }
}

// module.exports = { Hangman, GuessableWord };

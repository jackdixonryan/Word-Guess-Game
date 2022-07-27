
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
  }

  chooseElement() {
    const randomIndex = Math.floor(Math.random() * this.list.length);
    return this.list[randomIndex];
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

  clearGuesses() {
    this.allGuesses = [];
    this.lastGuess = null;
  }
}

module.exports = { Hangman, GuessableWord };

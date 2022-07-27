
class RomanHangman {
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
    this.lastGuess = null;
    this.allGuesses = [];
  }

  guess(char) {
    if (typeof char !== "string") {
      throw new Error("char must be a string.");
    }

    if (char.length !== 1) {
      throw new Error("char must be a single character.");
    }
    char = char.toLowerCase();
    this.lastGuess = char;
    if (this.allGuesses.includes(char)) {
      throw new Error("No duplicate guesses.");
    } else {
      this.allGuesses.push(char);
    }
  }

  clearGuesses() {
    this.allGuesses = [];
    this.lastGuess = null;
  }
}

module.exports = RomanHangman;

const { Hangman, GuessableWord } = require("../assets/javascript/game");

describe("The Roman Hangman Game", () => {
  test("It can be instantiated.", () => {
    expect(new Hangman(["foo", "bar"])).toBeInstanceOf(Hangman);
  });

  test("It can be given any array of strings.", () => {
    const hangman = new Hangman(["foo", "bar"])
    expect(hangman).toBeInstanceOf(Hangman);
    expect(hangman.list).not.toBeUndefined();
    expect(Array.isArray(hangman.list)).toBe(true);
    expect(hangman.list.length).toBe(2);
  });

  test("The list argument is required.", () => {
    expect(() => {
      new Hangman()
    }).toThrowError("list is required.");
  });

  test("The list must be an array.", () => {
    expect(() => {
      new Hangman("foo")
    }).toThrowError("The list must be an array.");
  });

  test("The list must contain strings.", () => {
    expect(() => {
      new Hangman([1, 2, 3])
    }).toThrowError("The list must contain strings.");
  });

  test("The list must contain at least one element.", () => {
    expect(() => {
      new Hangman([])
    }).toThrowError("The list must contain at least one string.");
  });

  test("The game has a chooseElement function.", () => {
    const hangman = new Hangman(["foo"]);
    expect(hangman.chooseElement).not.toBe(undefined);
    expect(hangman.chooseElement).toBeInstanceOf(Function);
  });

  test("The game has a currentWord property.", () => {
    const hangman = new Hangman(["foo"]);
    expect(hangman.currentWord).not.toBe(undefined);
    expect(hangman.currentWord).toBeInstanceOf(GuessableWord);
  });

  test("The chooseElement function sets the currentWord.", () => {
    const hangman = new Hangman(["foo"]);
    hangman.chooseElement();
    expect(hangman.currentWord).toBeInstanceOf(GuessableWord);
    expect(hangman.currentWord.word).toBe("foo");
  });

  test("The chooseElement function selects a different word than the previous when possible.", () => {
    const hangman = new Hangman(["foo", "bar"]);
    hangman.chooseElement();
    const originalWord = hangman.currentWord.word;
    hangman.chooseElement();
    const newWord = hangman.currentWord.word;
    expect(newWord).not.toBe(originalWord);
  })

  test("The game has a wins property that starts at 0.", () => {
    const hangman = new Hangman(["foo"]);
    expect(hangman.wins).toBe(0);
  });

  test("The game has a losses property that starts at 0.", () => {
    const hangman = new Hangman(["foo"]);
    expect(hangman.losses).toBe(0);
  });

  test("The game has a maxGuesses property.", () => {
    const hangman = new Hangman(["foo"]);
    expect(hangman.maxGuesses).not.toBe(undefined);
    expect(hangman.maxGuesses).toBe(10);
  });

  test("The game has a guesses property that starts at 0.", () => {
    const hangman = new Hangman(["foo"]);
    expect(hangman.guesses).toBe(0);
  });

  test("The game has a guess function.", () => {
    const hangman = new Hangman(["foo"]);
    expect(hangman.guess).not.toBe(undefined);
    expect(hangman.guess).toBeInstanceOf(Function);
  });

  test("The guess function throws an error if the argument is not a string.", () => {
    const hangman = new Hangman(["foo"]);
    expect(() => {
      hangman.guess(1)
    }).toThrowError("char must be a string.");
  });

  test("The guess function throws an error if the argument is not a single character.", () => {
    const hangman = new Hangman(["foo"]);
    expect(() => {
      hangman.guess("fo")
    }).toThrowError("char must be a single character.");
  });

  test("When the guess function succeeds, the game increments the guesses property.", () => {
    const hangman = new Hangman(["foo"]);
    hangman.guess("f");
    expect(hangman.guesses).toBe(1);
  });

  test("The game has an endRound function.", () => {
    const hangman = new Hangman(["foo"]);
    expect(hangman.endRound).not.toBe(undefined);
    expect(hangman.endRound).toBeInstanceOf(Function);
  });

  test("The endRound function increments the wins property if the game is won.", () => {
    const hangman = new Hangman(["foo"]);
    hangman.guess("f");
    hangman.guess("o");
    hangman.endRound();
    expect(hangman.wins).toBe(1);
  });

  test("When guesses is equal to maxGuesses, the game increments the losses property.", () => {
    const hangman = new Hangman(["foo"]);
    hangman.guess("a");
    hangman.guess("b");
    hangman.guess("c");
    hangman.guess("d");
    hangman.guess("e");
    hangman.guess("g");
    hangman.guess("h");
    hangman.guess("i");
    hangman.guess("j");
    hangman.guess("k");
    expect(hangman.losses).toBe(1);
  });

  test("The game has an isStarted property that starts as true.", () => {
    const hangman = new Hangman(["foo"]);
    expect(hangman.isStarted).toBe(true);
  });

  test("The game has a start function.", () => {
    const hangman = new Hangman(["foo"]);
    expect(hangman.start).not.toBe(undefined);
    expect(hangman.start).toBeInstanceOf(Function);
  });

  test("The start function sets the isStarted property to true.", () => {
    const hangman = new Hangman(["foo"]);
    hangman.start();
    expect(hangman.isStarted).toBe(true);
  });

  test("The game has a stop function.", () => {
    const hangman = new Hangman(["foo"]);
    expect(hangman.stop).not.toBe(undefined);
    expect(hangman.stop).toBeInstanceOf(Function);
  });

  test("The stop function sets the isStarted property to false.", () => {
    const hangman = new Hangman(["foo"]);
    hangman.start();
    hangman.stop();
    expect(hangman.isStarted).toBe(false);
  });

  test("Starting the game resets the guesses property and the currentWord.", () => {
    const hangman = new Hangman(["foo", "bar", "baz"]);
    const originalWord = hangman.currentWord.word;
    hangman.start();
    hangman.guess("f");
    hangman.guess("o");
    hangman.stop();
    hangman.start();
    expect(hangman.guesses).toBe(0);
    expect(hangman.currentWord.word).not.toBe(originalWord);
  });

  test("Guessing is not possible when the game is not started.", () => {
    const hangman = new Hangman(["foo"]);
    hangman.stop();
    expect(() => {
      hangman.guess("f");
    }).toThrowError("The game is not started.");
  });

});

describe("The GuessableWord", () => {
  test("The GuessableWord can be instantiated.", () => {
    expect(new GuessableWord("foo")).not.toBe(undefined);
  });

  test("The GuessableWord constructor requires a string argument.", () => {
    expect(() => {
      new GuessableWord(1);
    }).toThrowError("The word must be a string.");
  });

  test("It sets the word property to the value of the argument.", () => {
    const word = "foo";
    const guessableWord = new GuessableWord(word);
    expect(guessableWord.word).toBe(word);
  });

  test("The GuessableWord has a guess function", () => {
    const word = new GuessableWord("bar");
    expect(word.guess).not.toBe(undefined);
    expect(word.guess).toBeInstanceOf(Function);
  });

  test("The game has a lastGuess property that defaults to null.", () => {
    const word = new GuessableWord("bar");
    expect(word.lastGuess).toBe(null);
  })

  test("The guess function sets the value of lastGuess.", () => {
    const word = new GuessableWord("bar");
    word.guess("a");
    expect(word.lastGuess).not.toBe(null);
  });

  test("The guess function sets the value of lastGuess to the value of its guess argument.", () => {
    const word = new GuessableWord("bar");
    word.guess("a");
    expect(word.lastGuess).toBe("a");

    word.guess("b");
    expect(word.lastGuess).toBe("b");
  });

  test("The guess function only accepts a string argument.", () => {
    const word = new GuessableWord("bar");
    expect(() => word.guess(1)).toThrow("char must be a string.");
  });

  test("The guess argument must be only one character.", () => {
    const word = new GuessableWord("bar");
    expect(() => word.guess("string")).toThrow("char must be a single character.");
  });

  test("The guess should be normalized to lower case.", () => {
    const word = new GuessableWord("bar");
    word.guess("A");
    expect(word.lastGuess).toBe("a");
  })

  test("The game has an allGuesses property.", () => {
    expect(new GuessableWord("foo").allGuesses).not.toBeUndefined();
  });  

  test("The allGuesses property is an array.", () => {
    expect(new GuessableWord("foo").allGuesses).toBeInstanceOf(Array);
  });

  test("The allGuesses property should have no elements by default.", () => {
    expect(new GuessableWord("food").allGuesses.length).toBe(0);
  });

  test("The guess argument in the guess function is in the allGuesses array.", () => {
    const word = new GuessableWord("bar");
    word.guess("a");
    expect(word.allGuesses.includes("a")).toBe(true);
  });

  test("Characters can't appear twice in the allGuesses array.", () => {
    const word = new GuessableWord("bar");
    word.guess("a");
    try {
      word.guess("a");
    } catch(error) {
      // need to bypass wrapping function error.
    }

    expect(word.allGuesses.length).toBe(1);
  });

  test("If the guess function is invoked with the same argument twice, the second invocation will throw an error.", () => {
    const word = new GuessableWord("bar");
    word.guess("a");
    expect(() => word.guess("a")).toThrowError("No duplicate guesses.");
  });

  test("The GuessableWord has a solution, which is an array of null values equal in length to the word argument.", () => {
    const word = new GuessableWord("bar");
    expect(word.solution).not.toBe(undefined);
    expect(word.solution).toBeInstanceOf(Array);
    expect(word.solution.length).toBe(3);
    expect(word.solution.every(element => element === null)).toBe(true);
  });

  test("If the guessed char is in the word, the letter appears in the correct array position.", () => {
    const word = new GuessableWord("bar");
    word.guess("a");
    expect(word.solution).toEqual([null, "a", null]);
  });

  test("If the guessed char is not in the word, the solution is unchanged", () => {
    const word = new GuessableWord("bar");
    word.guess("v");
    expect(word.solution).toEqual([null, null, null]);
  });

  test("If the guessed char appears more than once in the word, the letter appears in all correct array positions.", () => {
    const word = new GuessableWord("foo");
    word.guess("o");
    expect(word.solution).toEqual([null, "o", "o"]);
  });

  test("The GuessableWord has an isSolved property that is false by default.", () => {
    const word = new GuessableWord("bar");
    expect(word.isSolved).toBe(false);
  });

  test("If all the letters in the solution array are not null, the isSolved property is true.", () => {
    const word = new GuessableWord("bar");
    word.guess("a");
    expect(word.isSolved).toBe(false);
    word.guess("r");
    expect(word.isSolved).toBe(false);
    word.guess("b");
    expect(word.isSolved).toBe(true);
  });

  test("The GuessableWord has a reset function.", () => {
    const word = new GuessableWord("bar");
    expect(word.reset).not.toBe(undefined);
    expect(word.reset).toBeInstanceOf(Function);
  });

  test("The reset function sets the solution array to null values.", () => {
    const word = new GuessableWord("bar");
    word.guess("a");
    word.guess("r");
    word.guess("b");
    word.reset();
    expect(word.solution).toEqual([null, null, null]);
  });

  test("The reset function sets the allGuesses array to an empty array.", () => {
    const word = new GuessableWord("bar");
    word.guess("a");
    word.guess("r");
    word.guess("b");
    word.reset();
    expect(word.allGuesses).toEqual([]);
  });

  test("The reset function sets the lastGuess property to null.", () => {
    const word = new GuessableWord("bar");
    word.guess("a");
    word.guess("r");
    word.guess("b");
    word.reset();
    expect(word.lastGuess).toBe(null);
  });

  test("The reset function sets the isSolved property to false.", () => {
    const word = new GuessableWord("bar");
    word.guess("a");
    word.guess("r");
    word.guess("b");
    word.reset();
    expect(word.isSolved).toBe(false);
  });
});

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

  test("The chooseElement function returns a string.", () => {
    const hangman = new Hangman(["foo"]);
    expect(typeof hangman.chooseElement()).toBe("string");
  });

  test("The chooseElement function returns one of the elements of the list.", () => {
    const hangman = new Hangman(["foo"]);
    expect(hangman.chooseElement()).toBe("foo");

    const secondHangman = new Hangman(["bar"]);
    expect(secondHangman.chooseElement()).toBe("bar");
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

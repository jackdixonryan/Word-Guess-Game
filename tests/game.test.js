const RomanHangman = require("../assets/javascript/game");

describe("The Roman Hangman Game", () => {
  test("It can be instantiated.", () => {
    expect(new RomanHangman(["foo", "bar"])).toBeInstanceOf(RomanHangman);
  });

  test("It can be given any array of strings.", () => {
    const hangman = new RomanHangman(["foo", "bar"])
    expect(hangman).toBeInstanceOf(RomanHangman);
    expect(hangman.list).not.toBeUndefined();
    expect(Array.isArray(hangman.list)).toBe(true);
    expect(hangman.list.length).toBe(2);
  });

  test("The list argument is required.", () => {
    expect(() => {
      new RomanHangman()
    }).toThrowError("list is required.");
  });

  test("The list must be an array.", () => {
    expect(() => {
      new RomanHangman("foo")
    }).toThrowError("The list must be an array.");
  });

  test("The list must contain strings.", () => {
    expect(() => {
      new RomanHangman([1, 2, 3])
    }).toThrowError("The list must contain strings.");
  });

  test("The list must contain at least one element.", () => {
    expect(() => {
      new RomanHangman([])
    }).toThrowError("The list must contain at least one string.");
  });

  test("The game has a guess function", () => {
    const hangman = new RomanHangman(["foo", "bar"]);
    expect(hangman.guess).not.toBe(undefined);
    expect(hangman.guess).toBeInstanceOf(Function);
  });

  test("The game has a lastGuess property that defaults to null.", () => {
    const hangman = new RomanHangman(["foo", "bar"]);
    expect(hangman.lastGuess).toBe(null);
  })

  test("The guess function sets the value of lastGuess.", () => {
    const hangman = new RomanHangman(["foo", "bar"]);
    hangman.guess("a");
    expect(hangman.lastGuess).not.toBe(null);
  });

  test("The guess function sets the value of lastGuess to the value of its guess argument.", () => {
    const hangman = new RomanHangman(["foo", "bar"]);
    hangman.guess("a");
    expect(hangman.lastGuess).toBe("a");

    hangman.guess("b");
    expect(hangman.lastGuess).toBe("b");
  });

  test("The guess function only accepts a string argument.", () => {
    const hangman = new RomanHangman(["foo", "bar"]);
    expect(() => hangman.guess(1)).toThrow("char must be a string.");
  });

  test("The guess argument must be only one character.", () => {
    const hangman = new RomanHangman(["foo", "bar"]);
    expect(() => hangman.guess("string")).toThrow("char must be a single character.");
  });

  test("The guess should be normalized to lower case.", () => {
    const hangman = new RomanHangman(["foo", "bar"]);
    hangman.guess("A");
    expect(hangman.lastGuess).toBe("a");
  })

  test("The game has an allGuesses property.", () => {
    expect(new RomanHangman(["foo"]).allGuesses).not.toBeUndefined();
  });  

  test("The allGuesses property is an array.", () => {
    expect(new RomanHangman(["food"]).allGuesses).toBeInstanceOf(Array);
  });

  test("The allGuesses property should have no elements by default.", () => {
    expect(new RomanHangman(["food"]).allGuesses.length).toBe(0);
  });

  test("The guess argument in the guess function is in the allGuesses array.", () => {
    const hangman = new RomanHangman(["foo", "bar"]);
    hangman.guess("a");
    expect(hangman.allGuesses.includes("a")).toBe(true);
  });

  test("Characters can't appear twice in the allGuesses array.", () => {
    const hangman = new RomanHangman(["foo"]);
    hangman.guess("a");
    try {
      hangman.guess("a");
    } catch(error) {
      // need to bypass wrapping function error.
    }

    expect(hangman.allGuesses.length).toBe(1);
  });

  test("If the guess function is invoked with the same argument twice, the second invocation will throw an error.", () => {
    const hangman = new RomanHangman(["foo"]);
    hangman.guess("a");
    expect(() => hangman.guess("a")).toThrowError("No duplicate guesses.");
  });

  test("There is clearGuesses function.", () => {
    const hangman = new RomanHangman(["foo"]);
    expect(hangman.clearGuesses).not.toBe(undefined);
    expect(hangman.clearGuesses).toBeInstanceOf(Function);
  });

  test("The clearGuesses function empties the allGuesses array.", () => {
    const hangman = new RomanHangman(["foo"]);
    hangman.guess("a");
    hangman.clearGuesses();
    expect(hangman.allGuesses.length).toBe(0);
  });

  test("The clearGuesses function also nulls lastGuess.", () => {
    const hangman = new RomanHangman(["foo"]);
    hangman.guess("a");
    hangman.clearGuesses();
    expect(hangman.lastGuess).toBe(null);
  });
});
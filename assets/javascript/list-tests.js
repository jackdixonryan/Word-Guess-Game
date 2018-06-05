var wordList = ["yikes", "booyah", "heaveho"];
var letterGuesses = [];
var computerChoice = wordList[Math.floor(Math.random()*3)];

var userText = document.getElementById("user-text") 

function makeHidden(word) {
    var hiddenWord = "";
    for (i = 0; i < word.length; i++) {
        hiddenWord = hiddenWord + " __ ";
    }
    return hiddenWord;
}

var puzzle = document.getElementById("mystery-word").innerHTML = makeHidden(computerChoice);


document.onkeyup = function(event) {
    
    var userChoice = userText.textContent = event.key;

    var newItem = document.getElementById("user-text").innerHTML = userChoice;
        if (newItem === null) {
            console.log("invalid");
        } else {
            letterGuesses.push(newItem);
            document.getElementById("guesses-so-far").innerHTML = letterGuesses;
        }
        


console.log(puzzle);

function letterFinder() {
    for (i = 0; i < puzzle.length; i++) {
        if (i === userChoice) {
            puzzle[i] = userChoice;
            return(puzzle);
        }
        console.log(puzzle);
    }
}

letterFinder();

}
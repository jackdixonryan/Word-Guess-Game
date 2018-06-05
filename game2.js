var wordList = ["Jack", "Duck", "Goose"];

var computerChoice = wordList[Math.floor(Math.random() * wordList.length)];

var mysteryWord = [];
for (i = 0; i < word.length; i++) {
    mysteryWord[i] = " __ ";
}
document.getElementById("mystery-word").innerHTML = mysteryWord;

var remainingLetters =  word.length;

while (remainingLetters > 0) {
    document.onkeyup = function(event) {
        var userGuess = event.key.toLowerCase();
        if (userGuess === null) {
            break;
        } else if (userGuess.length !== 1) {
            document.getElementById("message").innerHTML = "Please enter a single letter.";
        } else {
            for (j = 0; j < computerChoice.length; j++) {
                if (computerChoice[j] === userGuess) {
                    mysteryWord[j] = userGuess;
                    remainingLetters--;
                }
            }
        }
    }
}
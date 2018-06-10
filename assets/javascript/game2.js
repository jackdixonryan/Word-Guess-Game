var wordList = ["caesar", "hadrian",
                "augustus", "antoninus",
                "tiberius", "lucius",
                "caligula", "marcus aurelius",
                "claudius", "commodus",
                "cicero", "cato",
                "nero", "pompey",
                "galba", "justinian",
                "otho", "constantine",
                "vitellius", "theodora",
                "vespasian", "sulla",
                "titus",
                "domitian",
                "nerva",
                "trajan",
                ];

var wins = 0; 

console.log("Wins:", wins, "Losses:", losses);

function hangmanGame(randomWord) {

    var computerChoice = wordList[Math.floor(Math.random() * wordList.length)];

    function arrayWord(word) {
        var arrayWord = [];
        for (i = 0; i < word.length; i++) {
            arrayWord.push(word[i]);
        }
        return arrayWord;
    }

    //All is well here.
    var answer = arrayWord(computerChoice);
    console.log(answer);


    function maskWord(word) {
        var maskWord = [];
        var blanks = $("#mystery-word");
        for (j = 0; j < word.length; j++) {
            maskWord.push("__");
        }
        blanks.text(maskWord.join(" "));
        return maskWord;
    }

    var mysteryWord = maskWord(computerChoice);
    var lettersLeft = mysteryWord.length - 1;

    var guessList = [];

    //@onkeyup, a function begins. 
    document.onkeyup = function(event) {
        document.getElementById("guesses-so-far").innerHTML = ( 9 - guessList.length);

        $("#message").text("");
        var letter = event.key.toLowerCase();
        //right away, if the entry is not a single char, invalid alert.
        if (letter.length > 1 || guessList.includes(letter)) {

            $("#message").text("Invalid Guess.")

        } else {
            //if the user has guessed fewer than 10 times...
            if (guessList.length < 10) {
                //displays the letters they've guessed (W/Repeats)
                guessList.push(letter);
                console.log(guessList);

                //If there are still blanks in the word...
                if (lettersLeft > 0) {
                    //need something to check if letter has already been guessed...
                    //run a counter through the letters in the answer...
                    for (var k = 0; k < answer.length; k++) {
                        //if the letter is the same as the letter in the current index in the answer...
                        if (letter === answer[k]){
                            //log to see if working
                            console.log("y");
                            //set the index of mysteryWord (which is a blank) equal to the appropriate letter.
                            mysteryWord[k] = answer[k];

                            //display the newly populated mystery word.
                            $("#mystery-word").text(mysteryWord.join(" "));
                            console.log(lettersLeft);

                            //decrement letters left. 
                            lettersLeft--;
                        
                        //Check if answer is not equal to the index of answer(for debugging)    
                        } else if (letter !== answer[k]) {
                            console.log("n");
                        }
                    }
                //Once there are no letters left in the word, end the game.
                } else {
                    $("#mystery-word").text(answer.join(" "));
                    $("#message").text("You guessed the Roman!");
                    document.getElementById("image").src = "https://thumbs.dreamstime.com/b/statue-trajan-london-uk-bronze-roman-emperor-england-europe-33559147.jpg"
                    //sets guessList to 10 automatically just to prevent the user from continuing to guess once the word is fully populated.
                    guessList = 10;
                }
            
            //once the user has no guesses remaining, the gqme ends.
            } else {
                $("#message").text("Rome Burns!")
                document.getElementById("image").src = "https://i.pinimg.com/originals/04/14/2d/04142d36ef30e6862a5189827bef2817.jpg";
            }
        }
    } 
    console.log("WINS:", wins, "LOSSES", losses);
}


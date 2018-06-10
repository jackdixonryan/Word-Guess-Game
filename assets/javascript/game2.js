
//A list of names.
var wordList = ["caesar", "hadrian",
                "augustus", "antoninus",
                "tiberius", "lucius",
                "caligula",
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
var losses = 0;


//The entirety of our program is contained in the hangman function.
function hangmanGame() {

    var guessCount = 10;

    $("#guesses-so-far").text(guessCount);

    var guessList = [];

    //Setting computer choice to a random name in the name list.
    var computerChoice = wordList[Math.floor(Math.random() * wordList.length)];

    //Array word takes the name the computer chose and converts it into an array.
    function arrayWord(word) {
        var arrayWord = [];
        for (i = 0; i < word.length; i++) {
            arrayWord.push(word[i]);
        }
        return arrayWord;
    }

    //Var answer is an array of individual letter strings that, if combined, form the computer choice word.
    var answer = arrayWord(computerChoice);
    //using the console to bug check.
    console.log(answer);

    //mask word takes the arrayed word and converts it into a series of blanks equal in length to the arrayed word, now called answer.
    function maskWord(word) {
        var maskWord = [];
        var blanks = $("#mystery-word");
        for (j = 0; j < word.length; j++) {
            maskWord.push("__");
        }
        blanks.text(maskWord.join(" "));
        return maskWord;
    }

    //the masked word, whatever it is, is now stored in the array mystery word.
    var mysteryWord = maskWord(computerChoice);

    //PROBLEM: when letterLeft is one fewer than the length of mystery word,  successful game terminates at the right moment. However, an unsuccessful game will take any value if there are letters left and win the game unduly. Conversetly, adding one to this length eliminates the problem of permitting a random letter to end the game, but takes an extra turn to finish the successful game.
    var lettersLeft = mysteryWord.length;
    console.log("LETTERS LEFT:", lettersLeft); 
    //guess list is initialized as a blank array to be pushed to in the future.

    //@Detect the user's keystroke.
    document.onkeyup = function(event) {

        //prints guesses remaining, 10 minus the length of guessList. Not the best way to do this, I grant, since having one guess left is tantamount to having 0 guesses left.

        //Also, when 1 letter is remaining, guessing anything at all wins the game. 

        //Resets message display.

        $("#message").text("");


        //var letter is the letter chosen by the user.
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

                            lettersLeft = lettersLeft - 1;
                            console.log("Inside for loop, letters left is now:", lettersLeft);


                            //display the newly populated mystery word.
                            $("#mystery-word").text(mysteryWord.join(" "));
                            console.log(lettersLeft);

                            if (lettersLeft === 0) {
                                $("#mystery-word").text(answer.join(" "));
                                $("#guesses-so-far").text("");
            
                                $("#message").text("You guessed the Roman!");
            
                                document.getElementById("image").src = "https://thumbs.dreamstime.com/b/statue-trajan-london-uk-bronze-roman-emperor-england-europe-33559147.jpg"
                                //sets guessList to 10 automatically just to prevent the user from continuing to guess once the word is fully populated.
                                wins = wins + 1;
                                guessList = [];
                                if (losses < 10) {
                                    console.log(losses);
                                    hangmanGame();
                                }
                            }

                        
                        //Check if answer is not equal to the index of answer(for debugging)    
                        } else if (letter !== answer[k]) {
                            console.log("n");
                        }
                    }
                //Once there are no letters left in the word, end the game.
                } 
            
            //once the user has no guesses remaining, the gqme ends.
            } else {
                $("#message").text("Rome Burns!")
                document.getElementById("image").src = "https://i.pinimg.com/originals/04/14/2d/04142d36ef30e6862a5189827bef2817.jpg";
                losses = losses + 1;
                guessList = [];
                
                //I don't know if this is what recursivity means, but I think it does--I needed to call the function again, but I also needed to detect losses changes that were created inside of a narrow scope. This detects the losses count and runs the game again. 
                if (losses < 10) {
                    console.log(losses);
                    hangmanGame();
                }
            }
        }

        guessCount = 10 - guessList.length;

        document.getElementById("guesses-so-far").innerHTML = guessCount;

        console.log("guessCount is now:", guessCount);
        $("#wins").text(wins);
        $("#losses").text(losses)
    } 
}

hangmanGame();



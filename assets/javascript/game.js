//Welcome to the Hangman's Noose. Let's do some pseudocoding... 
    //Action List
        //1. Define a list of possible words in an array.
        //2. Have the computer choose a random possibility from the array of possible words. 
        //3. Display the word in HTML while masking each of it's letters and simultaneously remembering which blank slots correspond to which letters of the array. 
        //4. As the user guesses the letters, the blanks fill with the appropriate coressponding letter.
        //5. A wrong guess is logged in an array and a maximum number of incorrect guesses results in the termination of the game. 



//defining a basic word list.
var wordList = ["Jack", "Duck", "Goose"];

//computer choice is a random index in the wordList -- ensure that the parentheses don't close until after wordList.length otherwise the variable will only ever be defined as one of the three choices instead of any of them. 
var computerChoice = wordList[Math.floor(Math.random() * wordList.length)];

//Checking computer choice--all's well
console.log(computerChoice);


//The arrrayWord function below takes our string input and places it into an array called arrayWord, which will later be couched in the variable answer. This might seem needless but it will eventually allow me to check the index position of the blank in the displayed mystery word against the arrayWords index, which will allow the user's guess to be displayed to them. 

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


//Mask word is taking our word parameter (which for the purpose of this function will always be the computer's choice) and transforms the word into an array consisting of the appropriate number of blanks. 

function maskWord(word) {
    var maskWord = [];
    for (j = 0; j < word.length; j++) {
        maskWord.push(" __ ");
    }
    return maskWord;
}

//since maskWord variable will only have scope sufficient for the function, it won't get used again outside of the function. Instead, we'll store the function call only once here in a new variable, mysteryWord, which has global scope and will supercede maskWord altogether.
var mysteryWord = maskWord(computerChoice);

//Verifying that everything has worked so far--it has.
console.log(mysteryWord);

//Trying to move the game from console/alert to purely in browser.
document.getElementById("mystery-word").innerHTML = mysteryWord;

//Now for the hard part--taking user input and checking it against the letters in computerChoice to see if their guess exists in the context of the word. Can't figure out the direct document writing just yet, so just console.log or alerts for now until we have the logic nailed down. 


var lettersLeft = mysteryWord.length;


//A couple lines of comments have been deleted here because they pertained to an older version of this code--the newer code below is better and so the old comments have not survived. 

//There were some older comments here that I'm now replacing. Formerly, I was guaging the user's progress with a function called checkBlank, which was running yet another iterator through the array to count the number of blanks the user had not yet guessed. This has been replaced with the simple lettersLeft variable above, which decrements in the while loop below. Additionally, as a result of the checkBlank function, our lower while loop used to be a "while checkBlank returns true" couched within a while(true) loop, which was functional but the source of many bugs and editing problems. The below code works much better, is simpler to read, and is better designed as a whole. 

while (lettersLeft > 0) {  
    var userChoice = prompt("Enter a letter:");
    for (k = 0; k < answer.length; k++) {
        if (userChoice === answer[k]) {
            //So now, to alter the function to fill in the blanks. 
            //UPDATE: YES! This works a CHARM. Excellent. 
            mysteryWord[k] = answer[k];
            console.log(mysteryWord);
            document.getElementById("mystery-word").innerHTML = mysteryWord;
            lettersLeft--;
        } 
    }
}


console.log("You guessed the word!");

//e voila. Where formerly we had to jury-rig a solution to problems presented by the overly complex program we wrote, the new while loop gives us none of our former challenges. It doesn't run infinitely by accident sometimes (I crashed my browser *a lot*) and it doesn't have an extra turn before the word fills in. Why I tried to turn a simple iterator into a whole function to begin with I do not know.

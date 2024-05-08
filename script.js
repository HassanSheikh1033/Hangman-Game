const keyboarddiv = document.querySelector(".keyboard")
const hangmanImage = document.querySelector(".hangman-box img")
const guessesText = document.querySelector(".guesses-text b")
const wordDisplay = document.querySelector(".word-display")
const gameModel = document.querySelector(".game-model")
const gameAgainBtn = document.querySelector(".play-again")

let currentword, correctLetters, wrongGuessCount ;
const maxGuesses = 6;



const resetGame = () =>{
    // Reseting all game variables and UI elements...
   correctLetters = [];
   wrongGuessCount = 0;
   guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}` ;
   hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
   keyboarddiv.querySelectorAll("button").forEach((btn) => { btn.disabled = false});
        wordDisplay.innerHTML = currentword.split("").map(() => '<li class="letter"></li>').join("");
        gameModel.classList.remove("show")
}


const getRandomWord = () => {
    // Selcting a random word and hint from the wordList...
    const  {word, hint}  = wordList[Math.floor(Math.random() * wordList.length)]
    currentword = word;
    console.log(word);
     document.querySelector(".hint-text b").innerText = hint;
     resetGame();
}




const gameOver = (isVictory) =>{
    // After 600ms of game complete. It shows Model with relevant details...
   setTimeout(() => {
    const modelText = isVictory ? `You found the word:`: `The correct word was:`
   gameModel.querySelector('img').src = `images/${isVictory ? 'Victory' : 'Lost' }.gif`
   gameModel.querySelector('h4').innerText = `${isVictory ? 'Congrats!' : 'Game Over!' }`
   gameModel.querySelector('p').innerHTML = `${modelText} <b> ${currentword} </b>`
    gameModel.classList.add("show")
   }, 300);
}



const  initGame = (button , clickedLetter) =>{
    // Checking if clickedLetter is exist onthe currentWord..
    if (currentword.includes(clickedLetter)) {
        // Showing all corrent letters onthe word display..
        [...currentword].forEach((letter,index)=>{
            if (letter === clickedLetter) {
                correctLetters.push(letter); 
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
        // console.log(clickedLetter, " is exist on the word")
    }
    else{
        // If clicked the letter does not exist then update the wrongGuessCount and hangmanImage...
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
        // console.log(clickedLetter, " is not exist on the word")
    }

    button.disabled =true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}` ;


    //Display GameOver if any of these condition meets...
    if (wrongGuessCount === maxGuesses) {  return gameOver(false) }
    if (correctLetters.length === currentword.length) {  return gameOver(true) }
}






// Creating Keyboard Buttons and adding event listeners:
for (let i = 97; i <= 122; i++) {
const button = document.createElement("button")
button.innerText = String.fromCharCode(i);
    keyboarddiv.appendChild(button);
    button.addEventListener("click" , e=>{
        initGame(e.target, String.fromCharCode(i));
    })
}


getRandomWord();
gameAgainBtn.addEventListener("click", getRandomWord);



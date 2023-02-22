const GET_RANDOM_NUMBER = () => Math.floor((Math.random() * 100) + 1);
let getRandomNumber = GET_RANDOM_NUMBER();
let GUESS_LIST = [];

window.onload = () => {
    document.getElementById('check-button').addEventListener('click', playGame);
    document.getElementById('reset-button').addEventListener('click', resetGame);
}

const playGame = () => {
    const userGuessValue = Number(document.getElementById('user-guess').value);
    sendToHistory(userGuessValue);
    displayHistory();
    const guessEvaluation = checkGuess(userGuessValue);
    displayResult(guessEvaluation);
}

const checkGuess = (userGuessValue) => {
    if(userGuessValue == 0){
        return "zero";
    }
    else if(userGuessValue == getRandomNumber){
        return "equal";
    }
    else if(userGuessValue > getRandomNumber){
        return "high"
    }
    else{
        return "low";
    }
}

const displayResult =(guessEvaluation) => {
    const outputField = document.getElementById("guess-comment");
    switch(guessEvaluation){
        case "zero":{
            outputField.innerText = `Guess again You "zero" guesser...`;
            outputField.style.background = "red";
            break;
        }
        case "equal": {
            outputField.innerText = `Awesome Job! You got it.`;
            outputField.style.background = "green";
            document.getElementById('check-button').disabled = true;
            document.getElementById('check-button').style.background = "white";
            document.getElementById('check-button').style.color = "black";
        break;
        }
        case "low":{
            outputField.innerText = `Guess again You low guesser...`;
            outputField.style.background = "yellow";
            break;
        }
        case "high":{
            outputField.innerText = `Guess again You high guesser...`;
            outputField.style.background = "yellow";
            break;
        }
    }
}

const sendToHistory = (userGuessValue) => GUESS_LIST.push(userGuessValue);

const displayHistory = () => {
    let index = GUESS_LIST.length - 1;
    let list = `<ul class="guess-history">`;
    while(index >= 0){
        list += `<li>You guessed ${GUESS_LIST[index--]}</li>`;
    }
    list += `</ul>`;
    document.getElementById("guess-list").innerHTML = list;
}

const resetGame = () => {
    getRandomNumber = GET_RANDOM_NUMBER();
    document.getElementById("guess-comment").innerText = "";
    document.getElementById("guess-comment").style = "";
    GUESS_LIST = [];
    document.getElementById("guess-list").innerHTML = "";
    document.getElementById('user-guess').value = "";
}
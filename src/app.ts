const GET_RANDOM_NUMBER = (): number => Math.floor(Math.random() * 100 + 1);
let getRandomNumber: number = GET_RANDOM_NUMBER();
let GUESS_LIST: number[] = [];

window.onload = () => {
    (
        document.getElementById("check-button") as HTMLButtonElement
    ).addEventListener("click", playGame);
    (
        document.getElementById("reset-button") as HTMLButtonElement
    ).addEventListener("click", resetGame);
};

const playGame = () => {
    const userGuessValue: number = Number(
        (document.getElementById("user-guess") as HTMLInputElement).value
    );
    sendToHistory(userGuessValue);
    displayHistory();
    const guessEvaluation: string = checkGuess(userGuessValue);
    displayResult(guessEvaluation);
};

const checkGuess = (userGuessValue: number): string => {
    if (userGuessValue == 0) {
        return "zero";
    } else if (userGuessValue == getRandomNumber) {
        return "equal";
    } else if (userGuessValue > getRandomNumber) {
        return "high";
    } else {
        return "low";
    }
};

const displayResult = (guessEvaluation: string) => {
    const outputField = document.getElementById(
        "guess-comment"
    ) as HTMLDivElement;
    switch (guessEvaluation) {
        case "zero": {
            outputField.innerText = `Guess again You "zero" guesser...`;
            outputField.style.background = "red";
            break;
        }
        case "equal": {
            outputField.innerText = `Awesome Job! You got it.`;
            outputField.style.background = "green";
            (
                document.getElementById("check-button") as HTMLButtonElement
            ).disabled = true;
            (
                document.getElementById("check-button") as HTMLButtonElement
            ).style.background = "white";
            (
                document.getElementById("check-button") as HTMLButtonElement
            ).style.color = "black";
            break;
        }
        case "low": {
            outputField.innerText = `Guess again You low guesser...`;
            outputField.style.background = "yellow";
            break;
        }
        case "high": {
            outputField.innerText = `Guess again You high guesser...`;
            outputField.style.background = "yellow";
            break;
        }
    }
};

const sendToHistory = (userGuessValue: number) =>
    GUESS_LIST.push(userGuessValue);

const displayHistory = () => {
    let index: number = GUESS_LIST.length - 1;
    let list: string = `<ul class="guess-history">`;
    while (index >= 0) {
        list += `<li>You guessed ${GUESS_LIST[index--]}</li>`;
    }
    list += `</ul>`;
    (document.getElementById("guess-list") as HTMLDivElement).innerHTML = list;
};

const resetGame = () => {
    getRandomNumber = GET_RANDOM_NUMBER();
    (document.getElementById("guess-comment") as HTMLDivElement).innerText = "";
    (document.getElementById("guess-comment") as HTMLDivElement).setAttribute(
        "style",
        ""
    );
    GUESS_LIST = [];
    (document.getElementById("guess-list") as HTMLDivElement).innerHTML = "";
    (document.getElementById("user-guess") as HTMLDivElement).setAttribute(
        "value",
        ""
    );
    (document.getElementById("check-button") as HTMLButtonElement).disabled =
        false;
    (document.getElementById("check-button") as HTMLButtonElement).setAttribute(
        "style",
        ""
    );
};

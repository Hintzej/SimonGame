// Define game states
const gameStates = Object.freeze({
    gameStart: Symbol("gameStart"), // State of press A to start game
    showSimon: Symbol("showSimon"), // Showing Simon's pattern, all input ignored
    guessPattern: Symbol("guessPattern"), // Take player pattern guess
    gameEnd: Symbol("gameEnd") // Take any input to restart game
});

let currentGameState = gameStates.gameStart;

// define sounds
const blueSound = new Audio("sounds/blue.mp3");
const greenSound = new Audio("sounds/green.mp3");
const redSound = new Audio("sounds/red.mp3");
const yellowSound = new Audio("sounds/yellow.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");

// match sounds to button ids
const buttonSounds = {
    "blue": blueSound,
    "green": greenSound,
    "red": redSound,
    "yellow": yellowSound
};

function pressedAnimation(pressedButton) {
    $(pressedButton).addClass("pressed");
    const thisSound = buttonSounds[$(pressedButton).attr("id")];
    thisSound.load();
    thisSound.play();
    setTimeout(function() {
        $(pressedButton).removeClass("pressed");
    }, 100);
}

function getRandomButton() {
    const randomIndex = Math.floor(Math.random() * 4);
    const randomButton = $(".btn")[randomIndex];
    console.log(randomButton);
    return randomButton;
}

function startGame() {
    // TODO change from intro screen to game
}

function resetGame() {
    // TODO change from end screen to intro screen
}

// handle button presses
$(".btn").on("click", function() {
    // TODO add check for gamestate
    // TODO check if button matched pattern
    getRandomButton();
    pressedAnimation(this);
});

// start and reset game from keyboard
$(document).onkeydown(function(e) {
    if (currentGameState === gameStates.gameStart) {
        if (e.key === 'a') {
            startGame();
        }
    } else if (currentGameState === gameStates.gameEnd) {
        resetGame();
    }
});
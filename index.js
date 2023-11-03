// Define game states
const gameStates = Object.freeze({
    gameStart: Symbol("gameStart"), // State of press A to start game
    showSimon: Symbol("showSimon"), // Showing Simon's pattern, all input ignored
    guessPattern: Symbol("guessPattern"), // Take player pattern guess
    gameEnd: Symbol("gameEnd") // Take any input to restart game
});

let currentGameState = gameStates.gameStart;

const buttons = $(".btn");
const header = $("#level-title");

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

let simonList = [];
let guessCount = 0;

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
    return buttons[randomIndex];
}

function startGame() {
    currentGameState = gameStates.showSimon;
    showSimonSays();
}

function showSimonSays() {
    // add button to list
    simonList.push(getRandomButton())
    $(header).text(`Level ${simonList.length}`);
    // animate buttons
    for (let i= 0; i < simonList.length; i++) {
        setTimeout(function (){
            pressedAnimation(simonList[i]);
        }, i * 200)
    }
    // end segment after animation
    setTimeout(function (){
        currentGameState = gameStates.guessPattern;
    }, (simonList.length + 1) * 200)
}

function checkPlayerGuess(pressedButton) {
    if (pressedButton === simonList[guessCount]) {
        pressedAnimation(pressedButton);
        guessCount++;
        if (guessCount === simonList.length) {
            guessCount = 0;
            currentGameState = gameStates.showSimon;
            showSimonSays();
        }
    } else {
        endGame();
    }
}

function endGame() {
    currentGameState = gameStates.gameEnd;
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    wrongSound.load();
    wrongSound.play();
    $(header).text("Press any key to restart.");
}

function resetGame() {
    currentGameState = gameStates.gameStart;
    simonList = [];
    guessCount = 0;
    $(header).text("Press A Key to Start");
}

// handle button presses
buttons.on("click", function() {
    if (currentGameState === gameStates.guessPattern) {
        checkPlayerGuess(this);
    }
});

// start and reset game from keyboard
$(document).keydown(function(e) {
    if (currentGameState === gameStates.gameStart && e.key === 'a') {
        startGame();
    } else if (currentGameState === gameStates.gameEnd) {
        resetGame();
    }
});
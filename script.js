const green = $("#green");
const red = $("#red");
const yellow = $("#yellow");
const blue = $("#blue");
const boxes = $(".boxes");
const gameTitle = $("#gameTitle");
const keyboard = $(document);
let flash = $(".flashing");

let gameArray = [];
let playerArray = [];
let lvlCount = 0;
let count = 0;

boxes.click(playerTurn);
keyboard.keypress(keyboardStart);

function level() {
  playerArray = [];
  setTimeout(gameTurn(), 1000);
  playerTurn();
}

function gameTurn() {
  let colorArray = ["green", "red", "yellow", "blue"];
  let randomInput = Math.random();
  let randomColor = colorArray[Math.floor(randomInput * colorArray.length)];
  switch (randomColor) {
    case "green":
      gameArray.push(randomColor);
      audio = new Audio("sounds/green.mp3");
      setTimeout(audio.play(), 500);
      setTimeout(green.animate({ opacity: 0.5 }, 500));
      setTimeout(green.animate({ opacity: 1 }, 500));
      break;
    case "red":
      gameArray.push(randomColor);
      audio = new Audio("sounds/red.mp3");
      setTimeout(audio.play(), 500);
      setTimeout(red.animate({ opacity: 0.5 }, 500));
      setTimeout(red.animate({ opacity: 1 }, 500));
      break;
    case "yellow":
      gameArray.push(randomColor);
      audio = new Audio("sounds/yellow.mp3");
      setTimeout(audio.play(), 500);
      setTimeout(yellow.animate({ opacity: 0.5 }, 500));
      setTimeout(yellow.animate({ opacity: 1 }, 500));
      break;
    case "blue":
      gameArray.push(randomColor);
      console.log(gameArray);
      audio = new Audio("sounds/blue.mp3");
      setTimeout(audio.play(), 500);
      setTimeout(blue.animate({ opacity: 0.5 }, 500));
      setTimeout(blue.animate({ opacity: 1 }, 500));
      break;
  }
}

function playerTurn() {
  let time = 200;
  let timeCount = 0;
  if (
    count == 1 &&
    gameArray.length != 0 &&
    gameArray.length > playerArray.length
  ) {
    switch (this.id) {
      case "green":
        playerArray.push("green");
        audio = new Audio("sounds/green.mp3");
        audio.play();
        checkWin();
        break;
      case "red":
        playerArray.push("red");
        audio = new Audio("sounds/red.mp3");
        audio.play();
        checkWin();
        break;
      case "yellow":
        playerArray.push("yellow");
        audio = new Audio("sounds/yellow.mp3");
        audio.play();
        checkWin();
        break;
      case "blue":
        playerArray.push("blue");
        audio = new Audio("sounds/blue.mp3");
        audio.play();
        checkWin();
        break;
    }
    if (checkWin() == 0 && gameArray.length == playerArray.length) {
      level();
    } else if (checkWin() == 1) {
      gameTitle.text("Game Over, Press Any Key to Restart");
      gameArray = [];
      count = 0;
      keyboard.on("keypress", keyboardStart);
      audio = new Audio("sounds/wrong.mp3");
      audio.play();
      let backgroundInterval = setInterval(function () {
        flash.toggleClass("flashing");
        timeCount += time;
        if (timeCount == 800) {
          clearTimeout(backgroundInterval);
        }
      }, time);
    }
  }
}

function keyboardStart() {
  gameTitle.text("Level 1");
  count = 1;
  if (count == 1) {
    level();
    keyboard.off("keypress", keyboardStart);
  }
  if (checkWin() == 1) {
    level();
  }
}

function checkWin() {
  if (playerArray.length > 0) {
    for (let i = 0; i < playerArray.length; i++) {
      if (gameArray[i] != playerArray[i]) {
        return 1;
      }
    }
  }
  lvlCount = gameArray.length;
  gameTitle.text(`Level ${lvlCount}`);
  return 0;
}

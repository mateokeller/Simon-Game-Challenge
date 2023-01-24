let buttonColours = ["red", "blue", "yellow", "green"];
let pattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("level " + level);
    sequence();
    started = true;
  }
});

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (pattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === pattern.length) {
      setTimeout(function () {
        sequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function sequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let actualColour = buttonColours[randomNumber];
  pattern.push(actualColour);
  $("#" + actualColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(actualColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  pattern = [];
  started = false;
}

// // MOSTRAR CAJA
// function mostrarArray() {
//   sequence();
//   console.log(pattern);
// }

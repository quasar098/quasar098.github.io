const restartMenu = document.getElementsByClassName("menu")[0];
const restartText = document.getElementById("restartText");
const scoreText = document.getElementById("scoreText");
const timeText = document.getElementById("timeText");
let targets = [];
let score = 0;
let time = 0;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function relocate(_) {
  _.style.top = getRandomArbitrary(10, 80) + "%";
  _.style.left = getRandomArbitrary(10, 90) + "%";
}

for (let addTarget of document.getElementsByClassName("target")) {
  addTarget.addEventListener("mousedown", (event) => {
    if (event.button == 0) {
      relocate(addTarget);
      score += 1;
      redoText();
    }
  });
  targets.push(addTarget);
}


function redoText() {
  timeText.innerHTML = "time: " + time;
  scoreText.innerHTML = "score: " + score;
  if (score == 0) {
    restartText.innerHTML = "Hit a target to start";
  } else {
    restartText.innerHTML = "Click here to restart";
  }
}

restartMenu.addEventListener("mousedown", (event) => {
  if (event.button == 0) {
    if (score > 0) {
      restart();
    }
  }
});

function restart() {
  for (let target of targets) {
    relocate(target);
  }
  score = 0;
  redoText();
}
restart();

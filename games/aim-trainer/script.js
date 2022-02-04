const restartMenu = document.getElementById("menu");
const restartText = document.getElementById("restartText");
const scoreText = document.getElementById("scoreText");
const timeText = document.getElementById("timeText");
const gameOverDiv = document.getElementById("game-over-div");
const copyButton = document.getElementById("copy");
const controlDiv = document.getElementById("control-div");
const startTime = 30;
let targets = [];
let score = 0;
let time = startTime;
let timerID = 0;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function relocate(_) {
  _.style.top = getRandomArbitrary(20, 80) + "%";
  _.style.left = getRandomArbitrary(10, 90) + "%";
}

for (let addTarget of document.getElementsByClassName("target")) {
  addTarget.addEventListener("mousedown", (event) => {
    if (event.button == 0) {
      if (time == 0.0) {
        return;
      }
      if (score == 0) {
        timerID = setInterval(timerClick, 1000);
      }
      score += 1;
      relocate(addTarget);
      redoText();

    }
  });
  addTarget.ondragstart = function() { return false; };
  targets.push(addTarget);
}

function timerClick() {
  time -= 1;
  if (time == 0) {
  	changeGameOverText(true);
  }
  if (time == -1) {
    time += 1;
    clearInterval(timerID);
  }
  redoText();
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

copyButton.addEventListener("mousedown", (event) => {
	if (event.button == 0) {
		navigator.clipboard.writeText("quasar098's Aim Trainer - score: " + score + " - time: " + startTime);
		restartText.innerHTML = "Copied to clipboard";
	}
})

function changeGameOverText(hidden) {
	if (!hidden) {
		gameOverDiv.style.display = "none";
	} else {
		gameOverDiv.style.display = "flex";
	}
}

function restart() {
  for (let target of targets) {
    relocate(target);
  }
  score = 0;
  clearInterval(timerID);
  time = startTime;
  redoText();
  changeGameOverText(false);
}
restart();

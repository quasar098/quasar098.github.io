const restartButton = document.getElementById("restart");
var targets = [];

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
    }
  });
  targets.push(addTarget);
}


restartButton.addEventListener("mousedown", (event) => {
  if (event.button == 0) {
    restart();
  }
});

function restart() {
  for (let target of targets) {
    relocate(target);
  }
}
restart();

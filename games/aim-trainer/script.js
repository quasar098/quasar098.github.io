const restartButton = document.getElementById("restart");
var bruh = [];

for (let addTarget of document.getElementsByClassName("target")) {
  console.log(addTarget);
}


restartButton.addEventListener("mousedown", (event) => {
  if (event.button == 0) {
    restart();
  }
});

function restart() {
  console.log("do this");
}

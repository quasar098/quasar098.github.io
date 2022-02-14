const timerText = document.getElementById("main");
const statsText = document.getElementById("total-stats");
let prevTimer = 0;
let running = false;
let baseTime = 40;
let time = baseTime;
let beep = new Audio("beep.wav");
timerText.innerHTML = time;


function timer() {
	time -= 1;
	if (time == 1) {
		setTimeout(() => {
					beep.play();
		}, 600);


	}
	if (time == 0) {
		time = baseTime;

	}
	timerText.innerHTML = time;
}


document.getElementById('divv').addEventListener("click", (e) => {
	running = !running;
	if (running) {
		prevTimer = setInterval(timer, 1000);
		statsText.innerHTML = "running";
	} else {
		clearInterval(prevTimer);
		statsText.innerHTML = "paused";
	}
});

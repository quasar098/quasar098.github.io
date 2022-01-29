const headText = $("#head-text")[0];
const body = $("body")[0];
const board = $("#board")[0];
let lastHeaderSayEventId = 0;

function headerSay(total="", letterCount=0, speed=40) {
	var nextLetter = 0;
	if (total.length == letterCount) {
		return;
	}
	nextLetter = letterCount+1;
	if (total[nextLetter] == " ") {
		nextLetter += 1;
	}
	lastHeaderSayEventId = setTimeout(() => {
		headerSay(total, nextLetter);
	}, 40);
	headText.innerHTML = total.slice(0, letterCount+1);
}

body.addEventListener("mousedown", (event) => {
	if (event.button == 0) {
		clearTimeout(lastHeaderSayEventId);
		headerSay("It's just insane!");
	}
});

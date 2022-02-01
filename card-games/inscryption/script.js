const headText = $("#head-text")[0];
const body = $("body")[0];
const handDiv = $("#handDiv")[0];
let lastHeaderSayEventId = 0;

class PlayerManager {
	constructor(username) {
		this.username = username;
		this.cards = [];
	}
}

var localPlayer = new PlayerManager("quasar098");

function headerSay(total="", letterCount=0, speed=40) {
	if (letterCount == 0) {
	   clearTimeout(lastHeaderSayEventId);
	}
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

function createCardInHand() {
	let cardAdd = new Card();
	localPlayer.cards.push(cardAdd);
   	handDiv.appendChild(cardAdd.elem);
}

function removeCardFromHand(card) {
	handDiv.removeChild(card);
}

class Card {
	constructor() {
		// card variables
		this.cost = 0;
		this.cost_type = 0; // 0=blood, 1=bones

		this.attack = 0;
		this.max_health = 0;
		this.health = this.max_health;
		this.sigils = [];

		// elem
		var elem = document.createElement("div");
		elem.classList.add("card");

		// image
		var image = document.createElement("img");
		image.src = "images/blank.png";
		image.classList.add("card-image");

		// attack number
		var attackNumberText = document.createElement("p");
		attackNumberText.innerHTML = parseInt(this.attack);
		attackNumberText.classList.add("attack-number");
		attackNumberText.classList.add("card-text");

		// health health
		var healthNumberText = document.createElement("p");
		healthNumberText.innerHTML = parseInt(this.health);
		healthNumberText.classList.add("health-number");
		healthNumberText.classList.add("card-text");

		// appends
		elem.appendChild(image);
		elem.appendChild(attackNumberText);
		elem.appendChild(healthNumberText);
		
		// set this.elem to the actual element
		this.elem = elem;
		this.elem.addEventListener("mousedown", (event) => {
			// try to kill stuff to play stuff
		});
	}
}

createCardInHand("ouroboros");
createCardInHand("ouroboros");
createCardInHand("ouroboros");

// prevent dragging images
$('img').on('dragstart', false);

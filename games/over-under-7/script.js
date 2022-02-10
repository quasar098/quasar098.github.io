const inputBox = document.getElementById("bet-amount");
const moneyText = document.getElementById("money");
const rerollButton = document.getElementById("reroll");
const dice1 = document.getElementById("dice-1");
const dice2 = document.getElementById("dice-2");
const dropdownBox = document.getElementById("dropdown");
let bettingOn = "over";
let d1 = randInt(1, 6);
let d2 = randInt(1, 6);
let money = 100;
let bet = 0;

function setInputMinMax(min, max) {
  inputBox.min = min;
  inputBox.max = max;
}

function randInt(a, b) {
  return Math.round(Math.random()*(b-a)+a)
}

function setDice(num1, num2) {
  dice1.src = "images/dice-" + num1 + ".png"
  dice2.src = "images/dice-" + num2 + ".png"
}

function doesWin(i1, i2) {
  if (bettingOn == "over") {
    if (d1+d2 > 7) {
      return 1;
    }
  }
  if (bettingOn == "under") {
    if (d1+d2 < 7) {
      return 1;
    }
  }
  if (bettingOn == "equal") {
    if (d1+d2 == 7) {
      return 2;
    }
  }
  return -1;
}

function reroll() {
  // do this
  if (Math.round(bet) === bet) {  // reroll is a real number
    if (bet >= 1) {  // bet above 1
      if (bet <= money) { // bet less than money
        d1 = randInt(1, 6);
        d2 = randInt(1, 6);
        setDice(d1, d2);
        money += bet*doesWin(d1, d2);
      }
    }
  }
}

setInterval(() => {
  setInputMinMax(1, money);
  moneyText.innerHTML = "Your money: $" + money;
  bet = inputBox.value * 1;
  bettingOn = dropdownBox.value;
}, 100);

rerollButton.addEventListener("mousedown", (e) => {
  if (e.button == 0) {
    reroll();
  }
});

const inputBox = document.getElementById("bet-amount");
const moneyText = document.getElementById("money");
const rerollButton = document.getElementById("reroll");
let money = 100;
let bet = 0;

function setInputMinMax(min, max) {
  inputBox.min = min;
  inputBox.max = max;
}

function reroll() {
  // do this
  if (Math.round(bet) === bet) {
    console.log("ok");  // todo do this
  }
}

setInterval(() => {
  setInputMinMax(1, money);
  moneyText.innerHTML = "Your money: $" + money;
  bet = inputBox.innerHTML + 0;
}, 20);

rerollButton.addEventListener("mousedown", (e) => {
  if (e.button == 0) {
    reroll();
  }
});

console.log("%ch%cello there", "font-size: 100px", "font-size: 12px");  // h
let resources;
let index;
let possiblePacks;
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
class Task {
	constructor(name, time=10) {
		this.name = name;
		this.time = time;
		this.maxTime = time;
	}
}
class Resource {
	constructor(name) {
		this.name = name;
		this.assigned = undefined; // only for humans
	}
	// do not define any instance or class functions because JSON doesnt save when serializing. it makes a basic object
}
if (localStorage.getItem("emphasisResources") == null) {
	resources = [new Resource("human"), new Resource("tree"), new Resource("wood"), new Resource("mine"), new Resource("stone")];
	saveGame();
} else {
	resources = JSON.parse(localStorage.getItem("emphasisResources"));
}
class Pack {
	constructor(name, cost, get) {
		this.name = name;
		this.cost = cost;
		this.get = get;
		this.rewardDiscovered = false;
	}

	buyable() {
		let resourcesCopy = [...resources];
		for (let costItem in this.cost) {
			if (!(getResource(costItem, true).length >= this.cost[costItem])) {
				return false;
			}
		}
		return true;
	}

	buy() {
		this.rewardDiscovered = true;
		for (let costResource in this.cost) {
			removeResource(costResource, this.cost[costResource]);
		}
		for (index in this.get) {
			resources.push(new Resource(this.get[index]));
		}
	}

	hoverHint() {
		let hint = "";
		let costArray = [];
		for (let resourceName in this.cost) {
			for (index=0;index<this.cost[resourceName];index++) {
				costArray.push(resourceName);
			}
		}
		hint = "cost: " + costArray.join(", ");
		hint += " | get: "
		if (this.rewardDiscovered) {
			hint += this.get.join(", ");
		} else {
			hint += "?"
		}
		return hint;
	}
}

// dom control
let packsDiv = document.getElementById('pack-shop');
let inventoryDiv = document.getElementById('inventory');
let tasksDiv = document.getElementById('tasks');
let workIndicator = document.getElementById('work-indicator');
let saveButton = document.getElementById('save');
let resetButton = document.getElementById('reset');
let saveText = document.getElementById('save-timer');
let queueAllBox = document.getElementById('queue-all');
let queueText = document.getElementById('queue-text');

// tasks stuff
let currentTasks = [];
let buyableTasks = [];
let progressBars = [];

// packs stuff
possiblePacks = {
	"basic pack": new Pack("basic pack", {"wood":1, "stone":1}, ["wood hut", "stick", 'stick']),
	"human pack": new Pack("human pack", {"wood":3, "stone": 2, "wood hut": 1, "stick": 2}, ["human", "stick"]),
	"food pack": new Pack("food pack", {"wood":2, "human":2}, ["human", "human", "banana tree", "banana"]),
	"builder pack": new Pack("builder pack", {"stone": 2, "wood": 4}, ["plank", "plank", "plank", "nail", "nail"]),
	"property pack": new Pack("property pack", {"plank": 3, "nail": 2, "human": 2, "stick": 1}, ["stone hut", "human", "human", "plank", "well"]),
	"loot box pack": new Pack("loot box pack", {"water": 3, "nail": 4, "plank": 6}, ["common loot box", "rare loot box", "legendary loot box"]),
	"societal pack": new Pack("societal pack", {"stone hut": 2, "wood hut": 4, "plank": 2, "banana": 5}, ["castle", "field", "iron ore deposit"]),
	"iron age pack": new Pack("iron age pack", {"iron ore": 4, "human": 1, "stone": 10}, ["human", "forge"])
}

// resources stuff
const unstackableResources = [
	"human",
	"legendary loot box",
	"rare loot box",
	"common loot box"
];

queueText.addEventListener("click", () => {
	queueAllBox.checked = !queueAllBox.checked;
});

let discoveredPackNames = JSON.parse(localStorage.getItem("emphasisDiscoveredPacks"));
if (discoveredPackNames != null) {
	for (index in discoveredPackNames) {
		possiblePacks[discoveredPackNames[index]].rewardDiscovered = true;
	}
}

function saveGame() {
	let resourcesCopy = [];
	for (index in resources) {
		resourcesCopy.push(new Resource(resources[index].name));
	}
	localStorage.setItem("emphasisResources", JSON.stringify(resourcesCopy));

	// discovered packs
	let rewardsDiscovered = []
	for (let packName in possiblePacks) {
		if (possiblePacks[packName].rewardDiscovered) {
			rewardsDiscovered.push(packName);
		}
	}
	localStorage.setItem("emphasisDiscoveredPacks", JSON.stringify(rewardsDiscovered))
}

resetButton.addEventListener("click", () => {
	if (confirm("are you sure you want to reset")) {
		resources = [new Resource("human"), new Resource("tree"), new Resource("wood"), new Resource("mine"), new Resource("stone")];
		saveGame();
		window.location.reload();
	}
});

saveButton.addEventListener("click", () => {
	saveGame();
	window.location.reload();
});

function removeResource(name, amount) {
	let newRes = [];
	let quota = amount + 1 - 1;
	for (index in resources) {
		if (resources[index].name != name || !quota) {
			newRes.push(resources[index]);
		} else {
			quota -= 1;
		}
	}
	resources = newRes;
}

function getTask(name) {
	return currentTasks.filter(task => task.name == name);
}

function getResource(name, freehuman=false) {
	let res = [];
	for (index in resources) {
		if (resources[index].name == name) {
			if (freehuman & resources[index].assigned != undefined) {
				continue;
			}
			res.push(resources[index]);
		}
	}
	return res;
}

function updatePacksList() {
	removeAllChildNodes(packsDiv);
	function createPack(name) {
		let elm = document.createElement("p");
		let link = document.createElement("a");
		link.innerHTML = name + " ";
		if (possiblePacks[name].buyable()) {
			link.innerHTML += "✅"
		} else {
			link.innerHTML += "❌"
		}
		link.pack = possiblePacks[name];
		elm.appendChild(link);
		elm.addEventListener("click", (e) => {
			if (e.target.pack.buyable()) {
				e.target.pack.buy();
			}
			updateResources();
			updateTasksList();
			updatePacksList();
		});
		elm.title = link.pack.hoverHint();
		return elm;
	}
	for (index in possiblePacks) {
		let pack = possiblePacks[index];
		packsDiv.appendChild(createPack(pack.name));
	}
}

function makeProgressBar(task) {
	let progressBar = document.createElement("progress");
	progressBar.max = "100";
	progressBar.value = task.time/task.maxTime*100;
	progressBar.task = task;
	progressBars.push(progressBar);
	return progressBar;
}

function addResource(name, amount) {
	for (index=0;index<amount;index++) {
		resources.push(new Resource(name));
	}
	updateResources();
	updatePacksList();
	updateTasksList();
	return true;
}

function commonResource() {
	let possible = [
		"1wood",
		"3wood",
		"1stone",
		"3stone",
		"1rare loot box"
	]
	return possible[Math.floor(Math.random() * possible.length)];
}

function rareResource() {
	if (Math.random() > 0.95) {
		return "iron ore";
	}
	let possible = [
		"2plank",
		"5nail",
		"1stone hut",
		"8wood",
		"8stone",
		"2common loot box",
		"1legendary loot box",
		"4banana"
	]
	return possible[Math.floor(Math.random() * possible.length)];
}

function legendaryResource() {
	if (Math.random() > 0.7) {
		return "iron ore";
	}
	let possible = [
		"1human",
		"2human",
		"2rare loot box",
		"8banana",
		"4iron ore"
	]
	return possible[Math.floor(Math.random() * possible.length)];
}

function updateResources() {
	removeAllChildNodes(inventoryDiv);
	progressBars = [];
	function createHtmlFromResource(res) {
		let elm = document.createElement("p");
		elm.innerHTML = res.name;
		elm.resource = res;
		function appendGen(name, result, task) {
			if (res.name == name) {
				elm.title = "can get " + result;
				elm.innerHTML += " [🛠 " + result + "]";
			}
		}
		// append to resource generator name
		appendGen("tree", "wood", "chop tree");
		appendGen("mine", "stone", "mine stone");
		appendGen("harvest banana", "banana", "harvest banana");
		appendGen("well", "water", "scoop water");
		appendGen("castle", "gold bar", "steal from castle");
		appendGen("field", "wheat", "work the fields");
		appendGen("iron ore deposit", "iron ore", "mine iron ore");
		if (res.name.includes("loot box")) {  // is loot box
			let openLootBoxElm = document.createElement("a");
			let chosenRes;
			let amount;
			let resName;
			if (res.name.includes("legendary")) {
				chosenRes = legendaryResource();
			}
			else if (res.name.includes("rare")) {
				chosenRes = rareResource();
			}
			else {
				chosenRes = commonResource();
			}
			amount = chosenRes[0];
			resName = chosenRes.slice(1);
			openLootBoxElm.innerHTML = "open it";
			openLootBoxElm.amount = amount;
			openLootBoxElm.resName = resName;
			openLootBoxElm.style.marginLeft = "10px";
			openLootBoxElm.addEventListener("click", (e) => {
				addResource(e.target.resName, e.target.amount);
				removeResource(e.target.parentElement.innerText.slice(0,-7), 1);
				updateResources();
			});
			elm.appendChild(openLootBoxElm);
		}
		let task = res.assigned;
		if (task != undefined) {
			elm.progBar = makeProgressBar(task);
			elm.appendChild(elm.progBar);
		}
		return elm;
	}
	let hasRes = {}
	let hasBananas = getResource("banana").length > 0;
	for (index in resources) {
		if (!unstackableResources.includes(resources[index].name)) {  // group objects but not unstackableResources
			if (hasRes[resources[index].name] == undefined) {
			 	let resourceElement = createHtmlFromResource(resources[index]);
				hasRes[resources[index].name] = [1, resourceElement];
				inventoryDiv.appendChild(resourceElement);
			} else {
				hasRes[resources[index].name][0] += 1;
				hasRes[resources[index].name][1].innerHTML = resources[index].name + " (x" + hasRes[resources[index].name][0] + ")"
			}
		} else {  // group humans
			if (resources[index].name == "human") {
				let humanElm = createHtmlFromResource(resources[index]);
				if (hasBananas & humanElm.resource.assigned != undefined) {
					humanElm.title = "feed banana"
					let feedBanana = document.createElement("a");
					feedBanana.innerHTML = "feed banana";
					feedBanana.addEventListener("click", () => {
						humanElm.resource.assigned.time -= 4;
						humanElm.progBar.value -= 100*(4/humanElm.resource.assigned.maxTime);
						removeResource("banana", 1);
						updateResources();
					});
					humanElm.appendChild(feedBanana);
				}
				inventoryDiv.appendChild(humanElm);
			} else {
				inventoryDiv.appendChild(createHtmlFromResource(resources[index]));
			}
		}
	}
	workIndicator.innerHTML = currentTasks.length + "/" + getResource("human").length + " humans busy";
}

function getIndexOfTask(name) {
	for (index in currentTasks) {
		if (currentTasks[index].name == name) {
			return index;
		}
	}
}

function nextFreeHuman() {
	let humans = getResource("human")
	for (index in humans) {
		if (humans[index].assigned == undefined) {
			return humans[index];
		}
	}
	return {"task": undefined} // fake human
}

function queueAllTask(task) {
	let humans = getResource("human");
	for (let index2 in humans) {
		if (humans[index2].assigned == undefined) {
			humans[index2].assigned = {...task};
		}
	}
	updateResources();
}

function updateTasksList() {
	buyableTasks = [];
	removeAllChildNodes(tasksDiv);
	function addTask(name) {
		let elm = document.createElement("p");
		let link = document.createElement("a");
		elm.appendChild(link);
		link.innerHTML = name;
		function addTaskIfBuyable(name2, time) {
			if (name == name2) {
				elm.title = "takes " + time + " seconds";
				elm.addEventListener("click", () => {
					let task2 = new Task(name, time);
					if (task2.name == "smelt iron ore") {
						removeResource("iron ore", 1);
					}
					if (!queueAllBox.checked) {
						currentTasks.push(task2);
						nextFreeHuman().assigned = task2;
						updateTasksList();
						updateResources();
					} else {
						let humans = getResource("human");
						for (index in humans) {
							let task3 = new Task(name, time);
							if (humans[index].assigned == undefined) {
								currentTasks.push(task3);
								humans[index].assigned = task3;
							}
						}
						updateTasksList()
						updateResources();
					}
				});
			}
		}
		// add to creating element if matches name
		addTaskIfBuyable("chop tree", 5);
		addTaskIfBuyable("mine stone", 8);
		addTaskIfBuyable("harvest banana", 3);
		addTaskIfBuyable("scoop water", 3);
		addTaskIfBuyable("steal from castle", 10);
		addTaskIfBuyable("work the fields", 8);
		addTaskIfBuyable("mine iron ore", 60);
		addTaskIfBuyable("smelt iron ore", 60);
		return elm;
	}
	// can do tasks (enough humans available)
	if (getResource("human").length > currentTasks.length) {
		function checkGen(nameOfGen, task) {
			if (nameOfGen == "forge") {
				if (getResource("iron ore").length == 0) {
					return;
				}
			}
			if (getResource(nameOfGen).length > 0) {
				tasksDiv.appendChild(addTask(task))
			}
		}
		// can do task (resource gen found)
		checkGen("tree", "chop tree");
		checkGen("mine", "mine stone");
		checkGen("banana tree", "harvest banana");
		checkGen("well", "scoop water");
		checkGen("castle", "steal from castle");
		checkGen("field", "work the fields");
		checkGen("iron ore deposit", "mine iron ore");
		checkGen("forge", "smelt iron ore");
	} else {
		let noTasksAvailable = document.createElement("p")
		noTasksAvailable.innerHTML = "all humans are working";
		tasksDiv.appendChild(noTasksAvailable);
	}
}

updateResources();
updateTasksList();
updatePacksList();

let updateInterval = 0.02;
let speedMod = 1;

setInterval(() => {
	for (index in progressBars) {
		let progressBar = progressBars[index];
		progressBar.value -= updateInterval/progressBar.task.maxTime*100 * speedMod;
		if (progressBar.value <= 0) {
			progressBars.shift();
			progressBar.remove();
		}
	}
	let humans = getResource("human");
	for (index in humans) {
		function giveReward(human, taskName, awardName) {
			if (human.assigned.name == taskName) {
				resources.push(new Resource(awardName));
			}
		}
		let human = humans[index];
		if (human.assigned != undefined) {  // has task?
			human.assigned.time -= updateInterval;
			if (human.assigned.time <= 0) {  // is task is over?
				giveReward(human, "chop tree", "wood");
				giveReward(human, "mine stone", "stone");
				giveReward(human, "harvest banana", "banana");
				giveReward(human, "scoop water", "water");
				giveReward(human, "steal from castle", "gold bar");
				giveReward(human, "work the fields", "wheat");
				giveReward(human, "mine iron ore", "iron ore");
				giveReward(human, "smelt iron ore", "iron bar");
				human.assigned = undefined;
				updateResources();
				updatePacksList();
				updateTasksList();
			}
		}
	}
	let filtered = currentTasks.filter(task => task.time > 0);
	if (filtered.length != currentTasks.length) {
		currentTasks = filtered;
		updatePacksList();
		updateResources();
		updateTasksList();
	}
}, 1000*updateInterval);
document.body.style.userSelect = "none";

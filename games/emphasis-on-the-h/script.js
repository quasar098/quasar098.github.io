console.log("%ch%cello there", "font-size: 100px", "font-size: 12px");  // h
let index;
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
		this._ = Math.random();
	}
}
class Resource {
	constructor(name) {
		this.name = name;
		this.assigned = undefined; // only for humans
	}
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

// tasks stuff
let currentTasks = [];
let buyableTasks = [];
let progressBars = [];

// packs stuff
let possiblePacks = {
	"basic pack": new Pack("basic pack", {"wood":1, "stone":1}, ["wood hut", "stick", 'stick']),
	"human pack": new Pack("human pack", {"wood":3, "stone": 2, "wood hut": 1, "stick": 2}, ["human", "stick"]),
	"food pack": new Pack("food pack", {"wood":2, "human":2}, ["human", "human", "banana tree", "banana"]),
	"builder pack": new Pack("builder pack", {"stone": 2, "wood": 4}, ["plank", "plank", "plank", "nail", "nail"]),
	"property pack": new Pack("property pack", {"plank": 3, "nail": 2, "human": 2, "stick": 1}, ["stone hut", "human", "human", "plank", "well"])
}

// resources stuff
let resources = [new Resource("human"), new Resource("tree"), new Resource("wood"), new Resource("mine"), new Resource("stone")];

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
		link.innerHTML = name;
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

function updateResources() {
	removeAllChildNodes(inventoryDiv);
	progressBars = [];
	function createHtmlFromResource(res) {
		let elm = document.createElement("p");
		elm.innerHTML = res.name;
		function appendGen(name, result, task) {
			if (res.name == name) {
				elm.title = "can get " + result;
				elm.innerHTML += " [🛠 " + result + "]";
			}
		}
		// append to resource generator name
		appendGen("tree", "wood", "chop tree");
		appendGen("mine", "stone", "mine stone");
		appendGen("banana tree", "banana", "harvest banana");
		appendGen("well", "water", "scoop water");
		let task = res.assigned;
		if (task != undefined) {
			elm.appendChild(makeProgressBar(task));
		}
		return elm;
	}
	let hasRes = {}
	for (index in resources) {
		if (resources[index].name != 'human') {
			if (hasRes[resources[index].name] == undefined) {
			 	let resourceElement = createHtmlFromResource(resources[index]);
				hasRes[resources[index].name] = [1, resourceElement];
				inventoryDiv.appendChild(resourceElement);
			} else {
				hasRes[resources[index].name][0] += 1;
				hasRes[resources[index].name][1].innerHTML = resources[index].name + " (x" + hasRes[resources[index].name][0] + ")"
			}
		} else {
			inventoryDiv.appendChild(createHtmlFromResource(resources[index]));
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
					currentTasks.push(task2);
					nextFreeHuman().assigned = task2;
					updateTasksList();
					updateResources();
				});
			}
		}
		addTaskIfBuyable("chop tree", 5);
		addTaskIfBuyable("mine stone", 8);
		addTaskIfBuyable("harvest banana", 3);
		addTaskIfBuyable("scoop water", 3);
		return elm;
	}
	// can do tasks (enough humans available)
	if (getResource("human").length > currentTasks.length) {
		// can do task (resource gen found)
		function checkGen(nameOfGen, task) {
			if (getResource(nameOfGen).length > 0) {
				tasksDiv.appendChild(addTask(task))
			}
		}
		checkGen("tree", "chop tree");
		checkGen("mine", "mine stone");
		checkGen("banana tree", "harvest banana");
		checkGen("well", "scoop water");
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

function unAssignTasks(task) {
	let humans = getResource("human");
	for (index in humans) {
		if (humans[index].assigned != undefined) {
			if (humans[index].assigned.time <= 0) {
				humans[index].assigned = undefined;
			}
		}
	}
}

setInterval(() => {
	for (index in progressBars) {
		let progressBar = progressBars[index];
		progressBar.value -= updateInterval/progressBar.task.maxTime*100 * speedMod;
		if (progressBar.value <= 0) {
			progressBars.shift();
			progressBar.parentElement.removeChild(progressBar);
		}
	}
	let removeMe = undefined;
	for (index in currentTasks) {
		currentTasks[index].time -= updateInterval * speedMod;
		if (currentTasks[index].time < 0) {
			removeMe = currentTasks[index];
			function giveReward(taskName, awardName) {
				if (currentTasks[index].name == taskName) {
					resources.push(new Resource(awardName));
				}
			}
			giveReward("chop tree", "wood");
			giveReward("mine stone", "stone");
			giveReward("harvest banana", "banana");
			giveReward("scoop water", "water");
		}
	}
	if (removeMe != undefined) {
		unAssignTasks();
		currentTasks.shift();
		updatePacksList();
		updateTasksList();
		updateResources();
	}
}, 1000*updateInterval);
document.body.style.userSelect = "none";

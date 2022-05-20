console.log("%ch%cello there", "font-size: 100px", "font-size: 12px");  // h
var index;
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
	}
}
class Pack {
	constructor(name, cost, get) {
		this.name = name;
		this.cost = cost;
		this.get = get;
	}

	buyable() {
		let resourcesCopy = [...resources];
		for (let costItem in this.cost) {
			if (!(getResource(costItem).length >= this.cost[costItem])) {
				return false;
			}
		}
		return true;
	}

	buy() {
		for (let costResource in this.cost) {
			removeResource(costResource, this.cost[costResource]);
		}
		for (index in this.get) {
			resources.push(new Resource(this.get[index]));
		}
	}
}

// dom control
let packsDiv = document.getElementById('pack-shop')
let inventoryDiv = document.getElementById('inventory')
let tasksDiv = document.getElementById('tasks')

// tasks stuff
let currentTasks = [];
let buyableTasks = [];

// packs stuff
let possiblePacks = {
	"basic pack": new Pack("basic pack", {"wood":1, "stone":1}, ["hut", "stick"]),
	"food pack": new Pack("food pack", {"wood":2, "human":2}, ["human", "human", "apple", "banana"]),
	"human pack": new Pack("human pack", {"wood":3, "stone": 2, "hut": 1, "stick": 1}, ["human", "stick"])
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

function getResource(name) {
	let res = [];
	for (index in resources) {
		if (resources[index].name == name) {
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
		link.href = "javascript:void(0)";
		link.innerHTML = name;
		link.pack = possiblePacks[name];
		elm.appendChild(link);
		link.addEventListener("click", (e) => {
			if (e.target.pack.buyable()) {
				e.target.pack.buy();
			}
			updatePacksList();
		});
		return elm;
	}
	for (index in possiblePacks) {
		let pack = possiblePacks[index];
		packsDiv.appendChild(createPack(pack.name));
	}
}

function makeProgressBar(percentage) {
	let progressBar = document.createElement("progress");
	progressBar.max = "100";
	progressBar.value = percentage;
	return progressBar;
}

function updateResources() {
	removeAllChildNodes(inventoryDiv);
	function createHtmlFromResource(res) {
		let elm = document.createElement("p");
		elm.innerHTML = res.name;
		if (res.name == "tree") {
			elm.innerHTML += " 🪵"
			if (getTask("chop tree").length > 0) {
				let task = getTask("chop tree")[0];
				elm.appendChild(makeProgressBar(100*task.time/task.maxTime));
			}
		}
		if (res.name == "mine") {
			elm.innerHTML += " 🪨"
			if (getTask("mine stone").length > 0) {
				let task = getTask("mine stone")[0];
				elm.appendChild(makeProgressBar(100*task.time/task.maxTime));
			}
		}
		return elm;
	}
	for (index in resources) {
		inventoryDiv.appendChild(createHtmlFromResource(resources[index]));
	}
}

function updateTasksList() {
	buyableTasks = [];
	removeAllChildNodes(tasksDiv);
	function addTask(name) {
		let elm = document.createElement("p");
		let link = document.createElement("a");
		elm.appendChild(link);
		link.innerHTML = name;
		link.href = "javascript:void(0)";
		if (name == "chop tree") {
			link.addEventListener("click", () => {
				currentTasks.push(new Task("chop tree", 10));
			});
		}
		if (name == "mine stone") {
			link.addEventListener("click", () => {
				currentTasks.push(new Task("mine stone", 30));
			});
		}
		return elm;
	}
	if (getResource("human").length > currentTasks.length) {
		// can do tasks (enough humans available)
		if (getResource("tree").length > 0) {
			tasksDiv.appendChild(addTask("chop tree"))
		}
		if (getResource("mine").length > 0) {
			tasksDiv.appendChild(addTask("mine stone"))
		}
	} else {
		let noTasksAvailable = document.createElement("p")
		noTasksAvailable.innerHTML = "no tasks available";
		tasksDiv.appendChild(noTasksAvailable);
	}
}

updateResources();
updateTasksList();
updatePacksList();

setInterval(() => {
	updateResources();
	updateTasksList();
	let removeMe;
	for (index in currentTasks) {
		currentTasks[index].time -= 0.1;
		if (currentTasks[index].time < 0) {
			removeMe = currentTasks[index];
			if (currentTasks[index].name == "chop tree") {
				resources.push(new Resource("wood"));
			}
			if (currentTasks[index].name == "mine stone") {
				resources.push(new Resource("stone"));
			}
		}
	}
	if (removeMe != undefined) {
		currentTasks = currentTasks.splice(0, removeMe.name);
	}
}, 100);

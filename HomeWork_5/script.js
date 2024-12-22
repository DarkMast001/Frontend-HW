var tasks = new Array();

function addTask(taskName) {
	if (taskName == "" || taskName == undefined) {
		console.log("У задачи должно быть имя");
		return;
	}

	const task = {
		taskName: taskName,
		completed: false
	}
	tasks.push(task);
}

function completeTask(taskName){
	let flag = false;
	tasks.forEach((item) => {
		if (item.taskName == taskName) {
			item.completed = true;
			flag = true;
			return;
		}
	});
	if (!flag)
		console.log("Такой задачи нет");
}

function deleteTask(taskName){
	let newTasks = tasks.filter((item) => {
		return item.taskName != taskName;
	});
	if (newTasks.length == tasks.length){
		console.log("Такой задачи нет");
	}
	tasks = newTasks;
}

function printTasks(){
	tasks.forEach((item) => {
		console.log(`Задача: ${item.taskName}\nВыполнена: ${item.completed ? "Да" : "Нет"}`);
	});
}

addTask("Заправить постель");
addTask("");
addTask("Почистить зубы");
addTask("Сделать домашнее задание");
printTasks();
console.log("");

completeTask("Почистить зубы");
printTasks();
console.log("");

deleteTask("Почистить зубы");
deleteTask("роиупгркуад");
addTask("Выучить JavaScript");
printTasks();
console.log("");

addTask("Купить продукты");
completeTask("Выучить JavaScript");
printTasks();
console.log("");

completeTask("Сделать домашнее задание");
printTasks();
console.log("");
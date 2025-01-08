const inputNameField = document.querySelector(".input_name");
const inputTaskField = document.querySelector(".input_task");

const saveNameBtn = document.querySelector(".save_btn");
const addTaskBtn = document.querySelector(".add_task");

const showAllButton = document.querySelector(".btn_show.all");
const showDoneButton = document.querySelector(".btn_show.done");
const showUndoneButton = document.querySelector(".btn_show.undone");

const ul = document.querySelector(".todo_list");

let tasks = [];
let id = 0;

const TASKS_KEY = "tasks";

const saveName = () => {
	if (inputNameField.value != "") {
		localStorage.setItem("name", inputNameField.value);
		inputNameField.value = "";
		checkBD();
	}
}

const renderTasks = (filter = "all") => {
	const tasks = loadTasks();
	ul.innerHTML = "";

	tasks.filter(task => {
		if (filter === "done") return task.done;
		if (filter === "undone") return !task.done;
		return true;
	}).forEach(task => {
		const li = document.createElement("li");
		li.className = "list_item";
		li.innerHTML = `
			<input type="checkbox" class="is_done" ${task.done ? 'checked' : ''} data-id="${task.id}">
			<div class="task_text" data-id="${task.id}">${task.text}</div>
			<button type="button" class="btn_delete_task" data-id="${task.id}">X</button>
		`;
		task.done ? li.style.backgroundColor = "#D2FFD2" : li.style.backgroundColor = "#FFFFFF";
		ul.appendChild(li);
	});

	ul.querySelectorAll(".is_done").forEach(checkbox => {
		checkbox.addEventListener("change", toggleTaskStatus);
	})

	ul.querySelectorAll(".btn_delete_task").forEach(button => {
		button.addEventListener("click", deleteTask);
	});

	ul.querySelectorAll(".task_text").forEach(text => {
		text.addEventListener("dblclick", changeText);
	});
}

const addTask = () => {
	const taskText = inputTaskField.value.trim();
	if (!taskText) return alert("Введите задачу!");

	const tasks = loadTasks();
	const newTask = {
		id: Date.now().toString(),
		text: taskText,
		done: false
	};

	tasks.push(newTask);
	saveTasks(tasks);
	renderTasks();
	inputTaskField.value = "";
};

const deleteTask = (event) => {
	const taskId = event.target.dataset.id;
	const tasks = loadTasks().filter(task => task.id !== taskId);

	saveTasks(tasks);
	renderTasks();
};

const toggleTaskStatus = (event) => {
	const taskId = event.target.dataset.id;
	const tasks = loadTasks().map(task => {
		if (task.id === taskId) task.done = event.target.checked;
		return task;
	});

	saveTasks(tasks);
	renderTasks();
}

const changeText = (event) => {
	const taskId = event.target.dataset.id;
	const taskText = event.target;
	const index = loadTasks().findIndex(task => task.id === taskId);
	const tasks = loadTasks();

	const input = document.createElement("input");
	input.type = "text";
	input.value = taskText.textContent;
	input.style.marginInline = "10px";
	input.classList.add("task_input");

	taskText.replaceWith(input);
	input.focus();

	input.addEventListener("blur", () => {
		const newText = input.value.trim();
		const updatedTaskText = document.createElement('div');
		updatedTaskText.classList.add('task_text');
		updatedTaskText.textContent = newText || taskText.textContent;
		updatedTaskText.dataset.id = taskId;

		input.replaceWith(updatedTaskText);

		tasks[index].text = updatedTaskText.textContent;
		saveTasks(tasks);

		updatedTaskText.addEventListener('dblclick', changeText);
	});

	input.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			input.blur();
		}
	})
}

const filterTasks = (filter) => {
	renderTasks(filter);
}

const loadTasks = () => {
	const tasks = localStorage.getItem(TASKS_KEY);
	return tasks ? JSON.parse(tasks) : [];
}

const saveTasks = (tasks) => {
	localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

const checkBD = () => {
	const p = document.querySelector(".name");
	if (localStorage.length != 0){
		p.textContent = `Приветствую Вас, ${localStorage.getItem("name")}. Какие задачи на сегодня?`;
	}
	else {
		p.textContent = `Приветствую тебя, таинственный незнакомец.`;
	}
};

checkBD();
renderTasks();

saveNameBtn.addEventListener("click", saveName);
addTaskBtn.addEventListener("click", addTask);
showAllButton.addEventListener("click", () => filterTasks("all"));
showDoneButton.addEventListener("click", () => filterTasks("done"));
showUndoneButton.addEventListener("click", () => filterTasks("undone"));
inputTaskField.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		addTask();
	}
});
inputNameField.addEventListener("keydown", (event) => {
	if (event.key === "Enter"){
		saveName();
	}
})
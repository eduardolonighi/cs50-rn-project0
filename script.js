const classNames = {
  TODO_ITEM: "todo-container",
  TODO_CHECKBOX: "todo-checkbox",
  TODO_TEXT: "todo-text",
  TODO_DELETE: "todo-delete",
  TODO_LIST: "todo-list"
};

const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");

let todos = JSON.parse(localStorage.getItem("todos"));

if (!todos) todos = [];

const newTodo = () => {
  let taskName = document.getElementById("task-name").value;

  let lastTask = list.lastChild;

  //if there is a previous task increment id else init id as 1
  let id = lastTask ? parseInt(lastTask.getAttribute("task-id")) + 1 : 1;

  let task = {
    name: taskName,
    checked: false,
    id: id
  };
  todos.push(task);
  updateList();
};

const deleteTodo = id => {
  todos.forEach((task, index) => {
    if (task.id === id) {
      todos.splice(index, 1);
    }
  });
  updateList();
};

const toggleCheck = id => {
  todos.forEach((task, index) => {
    if (task.id === id) {
      todos[index].checked = !todos[index].checked;
    }
  });
  updateList();
};

const countItems = () => {
  itemCountSpan.innerHTML = todos.length;
};

const countUnchecked = () => {
  let count = 0;
  todos.forEach(task => {
    if (!task.checked) count++;
  });
  uncheckedCountSpan.innerHTML = count;
};

const saveData = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const updateList = () => {
  list.innerHTML = "";
  todos.forEach(task => {
    //list Item
    let listItem = document.createElement("li");
    listItem.setAttribute("task-id", task.id);
    listItem.className = classNames.TODO_ITEM;

    //checkbox
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.onclick = () => toggleCheck(task.id);
    checkBox.className = classNames.TODO_CHECKBOX;
    if (task.checked) {
      checkBox.checked = true;
    } else {
      checkBox.checked = false;
    }

    //name
    let name = document.createElement("p");
    name.className = classNames.TODO_TEXT;
    name.innerHTML = task.id + " " + task.name;

    //delete
    let del = document.createElement("button");
    del.onclick = () => deleteTodo(task.id);
    del.className = classNames.TODO_DELETE;
    del.innerHTML = "Delete";

    listItem.appendChild(checkBox);
    listItem.appendChild(name);
    listItem.appendChild(del);
    list.appendChild(listItem);
  });

  countItems();
  countUnchecked();

  saveData();
};

updateList();

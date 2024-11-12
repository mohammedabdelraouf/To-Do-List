const nameField = document.getElementById("firstName");
const tasksContainer = document.getElementById("div-container");
const addBtn = document.getElementById("addbtn");

let Tasks = JSON.parse(localStorage.getItem("Tasks"));
if (Tasks != null) {
  showTasks(Tasks);
} else {
  Tasks = [];
}

function addTask(name, tasksArr) {
  var task = {
    name: name,
  };
  tasksArr.push(task);
  localStorage.setItem("Tasks", JSON.stringify(tasksArr));
  showTasks(tasksArr);
}

function deleteTaskByID(taskIndex, tasksArr) {
  tasksArr.splice(taskIndex, 1);
  localStorage.setItem("Tasks", JSON.stringify(tasksArr));
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (nameField.value != "" && nameField.value != null) {
    addTask(nameField.value, Tasks);
    nameField.value = "";
  } else {
    alert("no data enterd");
  }
});

function showTasks(tasksArr) {
  tasksContainer.classList.remove("d-none");
  tasksContainer.innerText = "";
  tasksArr.forEach((element, i) => {
    if (i == tasksArr.length - 1) {
      console.log(i + "===" + tasksArr.length);
      showLastTask(element, i);
    } else {
      showTask(element, i);
    }
  });
}

function showTasksAfterDelete(tasksArr) {
  tasksContainer.classList.remove("d-none");
  tasksContainer.innerText = "";
  tasksArr.forEach((element, i) => {
    showTask(element, i);
  });
}

function showTask(element, i) {
  // create row elements
  let newCard = document.createElement("div");
  newCard.className = "task-card card mb-3 col-12 col-auto my-5 shadow-lg pb-2";
  let cardHeader = document.createElement("h5");
  cardHeader.className = " align-self-center text-center mb-5 mt-3";
  cardHeader.innerHTML = element.name;
  let removeBtn = document.createElement("button");
  removeBtn.innerText = "Delete";
  removeBtn.className =
    "delete-btn btn rounded-pill col-8 col-md-5 col-lg-3 col-xl-2 align-self-center mb-2 ";
  let taskToggle = document.createElement("input");
  taskToggle.setAttribute("type", "checkbox");
  // add eventListeners
  removeBtn.addEventListener("click", () => {
    deleteTaskByID(i, Tasks);
    if (Tasks.length == 0) {
      removeBtn.parentElement.classList.add("removing");
      setTimeout(() => {
        tasksContainer.classList.add("d-none");
      }, 400);
    } else {
      removeBtn.parentElement.classList.add("removing");
      setTimeout(() => {
        removeBtn.parentElement.remove();
      }, 510);
    }
    setTimeout(() => {
      showTasks(Tasks);
    }, 1000);
    //  console.table(Tasks)
  });

  taskToggle.addEventListener("change", () => {
    taskToggle.parentElement.classList.toggle("completed");
  });

  // append elements in parent
  newCard.appendChild(cardHeader);
  newCard.appendChild(removeBtn);
  newCard.appendChild(taskToggle);
  tasksContainer.appendChild(newCard);
}

function showLastTask(element, i) {
  // create row elements
  let newCard = document.createElement("div");
  newCard.className = "task-card card mb-3 col-12 col-auto my-5 shadow-lg pb-2";
  let cardHeader = document.createElement("h5");
  cardHeader.className = " align-self-center text-center mb-5 mt-3";
  cardHeader.innerHTML = element.name;
  let removeBtn = document.createElement("button");
  removeBtn.innerText = "Delete";
  removeBtn.className =
    "delete-btn btn rounded-pill col-8 col-md-5 col-lg-3 col-xl-2 align-self-center mb-2 ";
  let taskToggle = document.createElement("input");
  taskToggle.setAttribute("type", "checkbox");
  // add eventListeners
  removeBtn.addEventListener("click", () => {
    deleteTaskByID(i, Tasks);
    if (Tasks.length == 0) {
      removeBtn.parentElement.classList.add("removing");
      setTimeout(() => {
        tasksContainer.classList.add("d-none");
      }, 400);
    } else {
      removeBtn.parentElement.classList.add("removing");
      setTimeout(() => {
        removeBtn.parentElement.remove();
      }, 510);
    }
    //  console.table(Tasks)
  });

  taskToggle.addEventListener("change", () => {
    taskToggle.parentElement.classList.toggle("completed");
  });

  // append elements in parent
  newCard.appendChild(cardHeader);
  newCard.appendChild(removeBtn);
  newCard.appendChild(taskToggle);
  newCard.classList.add("new-element");
  tasksContainer.appendChild(newCard);
  setTimeout(() => {
    newCard.classList.add("adding");
    newCard.classList.remove("new-element");
  }, 200);

  setTimeout(() => {
    newCard.classList.remove("adding");
  }, 1000);
}

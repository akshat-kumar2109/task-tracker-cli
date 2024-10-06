import fs from "fs";
import { exit, argv } from "process";

const args = argv;

if (!args[2]) {
  console.log("Please provide some valid argument!");
  exit(1);
}

let task = {
  id: 1,
  description: "",
  status: "",
  createdAt: "",
  updatedAt: "",
};

// Check if file exists, otherwise create it
if (!fs.existsSync("./data.json")) {
  fs.writeFileSync("./data.json", JSON.stringify([]));
}

let tasks = JSON.parse(fs.readFileSync("./data.json", "utf8"));

if (tasks.length > 0) {
  task.id = tasks[tasks.length - 1].id + 1;
}

// CHECK
function check() {
  if (!args[3]) {
    console.log("Please provide a valid argument!");
    return;
  }
}

// Update JSON data
function writeToFile() {
  fs.writeFileSync("./data.json", JSON.stringify(tasks), (error) => {
    if (error) throw error;
    console.log("File written successfully!");
  });
}

// Calculate current time and convert it to Local time
function calcCurrentTime() {
  const date = new Date(new Date().toISOString());
  return new Date(date).toLocaleString();
}

// ADD Task
function addTask(description) {
  task.description = description;
  task.status = "todo";
  task.createdAt = calcCurrentTime();
  task.updatedAt = calcCurrentTime();

  tasks.push(task);
  writeToFile();
}

// UPDATE Task
function updateTask(id, status) {
  let found = false;
  tasks.forEach((task) => {
    if (task.id === id) {
      found = true;

      if (status) {
        task.status = status;
      } else {
        task.description = args[4];
      }

      task.updatedAt = calcCurrentTime();
    }

    if (!found) {
      console.log("Task not found!");
      exit(1);
    }
  });

  writeToFile();
}

// Filter tasks based on status
function filterTasks(status) {
  let filteredTasks = tasks.filter((task) => task.status === status);
  console.log("List of done tasks:", filteredTasks);
}

// DELETE Task
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  writeToFile();
}

switch (args[2]) {
  case "add":
    check();

    if (args.length > 4) {
      console.log("Too many arguments passed!");
      exit(1);
    }

    addTask(args[3]);
    console.log(`Task added successfully (ID: ${task.id})`);
    break;

  case "update":
    check();
    updateTask(Number.parseInt(args[3]));
    console.log("Task updated successfully!!");
    break;

  case "delete":
    check();
    deleteTask(Number.parseInt(args[3]));
    console.log("Task deleted successfully!!");
    break;

  case "mark-in-progress":
    check();
    updateTask(Number.parseInt(args[3]), "in-progress");
    console.log('Status updated to "in-progress"');
    break;

  case "mark-done":
    check();
    updateTask(Number.parseInt(args[3]), "done");
    console.log('Status updated to "done"');
    break;

  case "list":
    if (!args[3]) {
      console.log("Here is the list of tasks", tasks);
      break;
    }

    switch (args[3]) {
      case "done":
        filterTasks("done");
        break;
      case "todo":
        filterTasks("todo");
        break;
      case "in-progress":
        filterTasks("in-progress");
        break;
      default:
        throw new Error("Please provide a valid argument!")
    }
    break;

  default:
    throw new Error("Please provide a valid argument!")
}

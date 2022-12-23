import Task from './task.js';
import TodoLs from './todols.js';

// -- (v) currentTasks - contains our collection of tasks -- //
const todoList = new TodoLs();

const addNewTask = (task) => {
  let { description = null } = task;
  const { textContent: tcDescription } = task;

  description ??= tcDescription;

  const newTask = new Task({ description });

  return todoList.addTask(newTask);
};

const removeTask = (task) => task.parentNode.removeChild(task);

const rematchIndexes = (startIndex = 0) => {
  if (todoList.hasTasks()) {
    const onScreenTasks = Array.from(document.querySelectorAll('.task'));
    for (let i = startIndex; i < todoList.tasks.length; i += 1) {
      todoList.tasks[i].index = i;
      onScreenTasks[i].dataset.index = i;
    }
    todoList.save();

    return true;
  }
  return false;
};

const getAllCompleted = () => {
  const allCompleted = [];
  todoList.tasks.forEach((task) => {
    if (task.completed) {
      allCompleted.push({ index: task.index });
    }
  });
  return allCompleted;
};

const deleteAllCompleted = (tasks) => {
  tasks.forEach((task) => {
    todoList.delTask(task);
  });
};

export {
  todoList,
  addNewTask,
  removeTask,
  rematchIndexes,
  getAllCompleted,
  deleteAllCompleted,
};

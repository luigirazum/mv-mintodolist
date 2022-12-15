// Lodash, now imported by this script
import _, { add } from 'lodash';

// Importing Task to create valid Task objects.
// Importing TodoLs to create a collection of Task objects.
import Task from './task.js';
import TodoLs from './todols.js';

// Import css styles for our project
import './style.css';

// -- (v) currentTasks - contains our collection of tasks -- //
const todoList = new TodoLs();

// -- (f) displayTask - creates the 'li' task html and inserts it into #tdlist -- //
const displayTask = (task) => {
  const checkElement = document.createElement('span');
  checkElement.textContent = 'radio_button_unchecked';
  checkElement.classList.add('material-symbols-outlined');
  checkElement.classList.add('unchecked');

  const itemElement = document.createElement('span');
  itemElement.textContent = task.description;
  itemElement.classList.add('item');

  const iconElement = document.createElement('span');
  iconElement.textContent = 'more_vert';
  iconElement.classList.add('material-symbols-outlined');
  iconElement.classList.add('icon');

  const liTask = document.createElement('li');
  liTask.classList.add('task');
  liTask.appendChild(checkElement);
  liTask.appendChild(itemElement);
  liTask.appendChild(iconElement);

  const tdList = document.getElementById('tdlist');
  tdList.insertBefore(liTask, tdList.children[tdList.children.length - 1]);
};

// -- (e) When the DOM is ready, our tasks are generated from the currentTasks collection -- //
window.addEventListener('DOMContentLoaded', () => {
  if (todoList.hasTasks()) {
    // If we have tasks in our todoList, we'll display them.
    _.forEach(todoList.tasks, (task) => {
      displayTask(task);
    });
  }
});

// -- (v) wrtTask - points to the "Add to your list..." new task -- //
// const wrtTask = document.querySelector('.input');
// - We listen for the 'Enter' key to add the new Task - //
// - When adding a new Task you can cancel with 'Esc'  - //

// const addTaskIcon = document.querySelector('.add .icon');

const uiEvents = document.querySelector('#tdlist');

uiEvents.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(e, e.target, e.currentTarget, e.target.id);
});
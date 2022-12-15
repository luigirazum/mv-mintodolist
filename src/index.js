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
  checkElement.setAttribute('data-completed', task.completed);
  checkElement.textContent = 'radio_button_unchecked';
  checkElement.classList.add('material-symbols-outlined');
  checkElement.classList.add('unchecked');
  checkElement.classList.add('btn-radio');

  const itemElement = document.createElement('span');
  itemElement.textContent = task.description;
  itemElement.classList.add('item');

  const iconElement = document.createElement('span');
  iconElement.textContent = 'more_vert';
  iconElement.classList.add('material-symbols-outlined');
  iconElement.classList.add('icon');
  iconElement.classList.add('btn-more');

  const liTask = document.createElement('li');
  liTask.classList.add('task');
  liTask.setAttribute('data-index', task.index);
  liTask.appendChild(checkElement);
  liTask.appendChild(itemElement);
  liTask.appendChild(iconElement);

  const tdList = document.getElementById('tdlist');
  tdList.insertBefore(liTask, tdList.children[tdList.children.length - 1]);
};

const addNewTask = (task) => {
  let { description = null } = task;
  const { textContent: tcDescription } = task;

  description ??= tcDescription;

  const newTask = new Task({ description });

  return todoList.addTask(newTask);
};

const removeTask = (task) => task.parentNode.removeChild(task);

const rematchIndexes = (startIndex) => {
  const onScreenTasks = Array.from(document.querySelectorAll('.task'));

  if (todoList.hasTasks()) {
    for (let i = startIndex; i < todoList.tasks.length; i += 1) {
      todoList.tasks[i].index = i;
      onScreenTasks[i].dataset.index = i;
    }
    return true;
  }
  return false;
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
  const { target: t, currentTarget: ct } = e;
  const { target: { dataset: { index: tIndex } } } = e;
  const { target: { id, previousElementSibling: pES } } = e;
  const { target: { parentElement: { dataset: { index: peIndex } } } } = e;
  const { target: { parentElement: pE } } = e;
  const { target: { className: tName } } = e;

  e.preventDefault();
  console.log('event', e);
  console.log('target', t);
  console.log('currentTarget', ct);
  console.log('id', id);
  console.log('previousElementSibling', pES);

  if (id) {
    switch (id) {
      case 'b-add':
        if (pES.textContent) {
          console.log('Call to ADD NEW TASK.');
          const addedTask = addNewTask(pES);
          pES.textContent = '';
          displayTask(addedTask);
          console.log(addedTask);
          console.log(todoList);
        } else {
          pES.textContent = '';
          pES.removeAttribute('contenteditable');
        }
        break;
      case 'i-new':
        t.setAttribute('contenteditable', true);
        t.focus();
        break;
      default:
        if (tIndex) {
          console.log('Click on a list Task', t);
        } else if (peIndex) {
          console.log('Click somewhere in a Task', t, pE);
        }
        break;
    }
  } else if (tName.includes('btn')) {
    if (tName.includes('btn-more')) {
      console.log('btn-more en:', pE);
      t.textContent = 'delete';
      t.classList.toggle('btn-more');
      t.classList.toggle('btn-delete');
    }
    if (tName.includes('btn-radio')) {
      console.log('btn-radio en:', pE);
    }
    if (tName.includes('btn-delete')) {
      console.log('delete the item', pE);
      const { dataset } = pE;
      const delIndex = todoList.delTask(dataset);
      removeTask(pE);
      console.log(rematchIndexes(delIndex));
      console.log(todoList.tasks);
    }
  }
});
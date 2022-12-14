// Lodash, now imported by this script
import _ from 'lodash';

// Import css styles for our project
import './style.css';

// -- (v) currentTasks - contains our collection of tasks -- //
const currentTasks = [
  { index: 0, completed: false, description: 'create the object task' },
  { index: 1, completed: false, description: 'insert the list items dinamycally' },
  { index: 2, completed: false, description: 'on page load, show the list' },
];

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
  _.forEach(currentTasks, (task) => {
    displayTask(task);
  });
});

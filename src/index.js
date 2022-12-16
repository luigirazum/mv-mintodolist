// Lodash, now imported by this script
import _ from 'lodash';

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
  const itemElement = document.createElement('span');
  const iconElement = document.createElement('span');

  checkElement.setAttribute('data-completed', task.completed);
  itemElement.textContent = task.description;

  checkElement.classList.add('material-symbols-outlined');
  checkElement.classList.add('btn-radio');

  itemElement.classList.add('item');

  if (task.isCompleted()) {
    checkElement.textContent = 'task_alt';
    checkElement.classList.add('checked');
    itemElement.classList.add('completed');
  } else {
    checkElement.textContent = 'radio_button_unchecked';
    checkElement.classList.add('unchecked');
  }

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

    todoList.save();

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

// -- (v) uiEvents - to watch the events on the ul #tdlist -- //
const uiEvents = document.querySelector('#tdlist');

// -- uiEvents - handles the user interactions. -- //
uiEvents.addEventListener('click', (e) => {
  const { target: t } = e;
  const { target: { id, previousElementSibling: pES } } = e;
  const { target: { parentElement: pE } } = e;
  const { target: { className: tName } } = e;

  e.preventDefault();

  if (id) {
    switch (id) {
      case 'b-add':
        if (pES.textContent) {
          // when add new task button is clicked
          // a new task is created/displayed
          const addedTask = addNewTask(pES);
          pES.textContent = '';
          displayTask(addedTask);
        } else {
          pES.textContent = '';
          pES.removeAttribute('contenteditable');
        }
        break;
      case 't-add':
        t.firstElementChild.setAttribute('contenteditable', true);
        t.firstElementChild.focus();
        break;
      case 'i-new':
        // when 'Add to your list' is clicked
        // Edit the input to add a new task
        t.setAttribute('contenteditable', true);
        t.focus();
        break;
      case 'b-sweep':
        if (todoList.hasCompletedTasks()) {
          const deleteTasks = Array.from(document.querySelectorAll('.task .completed'));
          deleteTasks.forEach((dt) => {
            const delIndex = todoList.delTask(dt.parentElement.dataset);
            removeTask(dt.parentElement);
            rematchIndexes(delIndex);
          });
        }
        break;
      case 'b-sync':
        // eslint-disable-next-line no-restricted-globals
        location.reload();
        break;
      default:
        break;
    }
  } else if (tName.includes('btn')) {
    if (tName.includes('btn-more')) {
      // when more button for the task is clicked
      // show the delete button for the task
      t.textContent = 'delete';
      t.classList.remove('btn-more');
      t.classList.add('btn-delete');
    }
    if (tName.includes('btn-radio')) {
      // set the task as done
      if (t.dataset.completed === 'true') {
        t.classList.remove('checked');
        t.textContent = 'radio_button_unchecked';
        t.classList.add('unchecked');
        t.dataset.completed = false;
        t.nextElementSibling.classList.remove('completed');
      } else {
        t.classList.remove('unchecked');
        t.textContent = 'task_alt';
        t.classList.add('checked');
        t.dataset.completed = true;
        t.nextElementSibling.classList.add('completed');
      }
      todoList.comTask(e);
    }
    if (tName.includes('btn-delete')) {
      // when the delete button is clicked
      // delete the task
      const { dataset } = pE;
      const delIndex = todoList.delTask(dataset);
      removeTask(pE);
      rematchIndexes(delIndex);
    }
  } else if (tName.includes('task') && !tName.includes('editing')) {
    t.classList.add('editing');
    if (t.lastElementChild.classList.contains('btn-more')) {
      t.lastElementChild.click();
    }
    t.children[1].setAttribute('contenteditable', true);
    t.children[1].focus();
    t.children[2].addEventListener('click', (ce) => {
      ce.preventDefault();
      const { target: ct } = ce;
      if (ct) {
        // when editing a task
      }
    });
    t.children[1].addEventListener('blur', (ev) => {
      ev.preventDefault();
      const { target: bt, target: { parentElement: bpE, nextElementSibling: bnES } } = ev;
      bpE.classList.remove('editing');
      bnES.textContent = 'more_vert';
      bnES.classList.remove('btn-delete');
      bnES.classList.add('btn-more');
      bt.removeAttribute('contenteditable');
      todoList.updTask(bt);
    });
  }
});

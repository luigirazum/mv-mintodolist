// Lodash, now imported by this script
import _ from 'lodash';
import Task from './task.js';

class TodoLS {
  constructor() {
    let readTasks = JSON.parse(localStorage.getItem('todoData'));
    readTasks ??= [];
    this.tasks = readTasks.map((task) => new Task(task));
  }

  hasTasks = () => this.tasks.length > 0;

  hasCompletedTasks = () => this.tasks.some(({ completed: c }) => c);

  save = () => {
    localStorage.setItem('todoData', JSON.stringify(this.tasks));
  }

  addTask = (task) => {
    task.index = this.tasks.length;
    this.tasks.push(task);
    this.save();
    return _.last(this.tasks);
  }

  delTask = ({ index: i }) => {
    const previousSize = this.tasks.length;

    this.tasks = this.tasks.filter(({ index }) => index !== parseInt(i, 10));

    this.save();

    return (previousSize !== this.tasks.length) ? parseInt(i, 10) : null;
  }

  updTask = ({ parentElement: { dataset: { index: i } }, textContent: d }) => {
    this.tasks[parseInt(i, 10)].description = d;
    this.save();
  }

  comTask = ({ target: { parentElement: { dataset: { index: i } }, dataset: c } }) => {
    this.tasks[parseInt(i, 10)].setCompleted(c);
    this.save();
  }
}

export { TodoLS as default };
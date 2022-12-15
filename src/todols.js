// Lodash, now imported by this script
import _ from 'lodash';

class TodoLS {
  constructor() {
    this.tasks = [];
  }

  hasTasks = () => this.tasks.length > 0;

  addTask = (task) => {
    task.index = this.tasks.length;
    this.tasks.push(task);
    return _.last(this.tasks);
  }

  delTask = ({ index: i }) => {
    const previousSize = this.tasks.length;

    this.tasks = this.tasks.filter(({ index }) => index !== parseInt(i, 10));

    return (previousSize !== this.tasks.length) ? parseInt(i, 10) : null;
  }
}

export { TodoLS as default };
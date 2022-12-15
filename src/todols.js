// Lodash, now imported by this script
import _ from 'lodash';

class TodoLS {
  constructor() {
    this.tasks = [];
  }

  hasTasks = () => this.tasks.length > 0;

  newTask = (task) => {
    task.index = this.tasks.length;
    this.tasks.push(task);
  }

  delTask = ({ index: i }) => {
    const previousSize = this.tasks.length;
    this.tasks = _.filter(this.tasks, (task) => task.index === i);

    return previousSize !== this.tasks.length;
  }
}

export { TodoLS as default };
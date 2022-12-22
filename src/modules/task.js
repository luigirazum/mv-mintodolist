class Task {
  constructor({ description, completed = false, index = null }) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

  setCompleted = ({ completed: c }) => {
    if (c === 'true') {
      this.completed = true;
    } else {
      this.completed = false;
    }
  }

  isCompleted = () => this.completed;
}

export { Task as default };
class Task {
  constructor({ description, completed = false, index = null }) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

  setCompleted = ({ completed: c }) => {
    this.completed = c;
  };

  isCompleted = () => this.completed;
}

export { Task as default };
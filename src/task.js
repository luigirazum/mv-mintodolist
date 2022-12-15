class Task {
  constructor({ description, completed=false, index=null }) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

export { Task as default };
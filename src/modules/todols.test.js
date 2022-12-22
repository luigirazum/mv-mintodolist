/*
  * @jest-environment jsdom
 */

import TodoLS from "./todols.js";
import Task from "./task.js";


describe("Test add and remove", () => {
  test("testing adding task", () => {
    const todols = new TodoLS();
    const task = new Task('task 1, 0');
    todols.addTask(task);
    expect(todols.tasks.length).toBe(1);
  });

  test('testing remove task', () => {
    const tDList = new TodoLS();
    let task = new Task('task 1', 0);
    tDList.addTask(task);
    task = new Task('task 2', 1);
    tDList.addTask(task);
    task = new Task('task 3', 2);
    tDList.addTask(task);
    tDList.delTask(1);
    expect(tDList.tasks.length).toBe(2);
  });
});
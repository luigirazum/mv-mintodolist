/*
  * @jest-environment jsdom
 */

import TodoLS from './todols.js';
import Task from './task.js';

describe('Test add/remove a task', () => {
  test('testing adding task', () => {
    const todols = new TodoLS();
    const task = new Task('task 1, 0');
    todols.addTask(task);
    expect(todols.tasks.length).toBe(1);
    todols.clear();
  });

  test('testing remove task', () => {
    const tDList = new TodoLS();
    const task1 = new Task('task 1, 0');
    tDList.addTask(task1);
    const task2 = new Task('task 2, 1');
    tDList.addTask(task2);
    const task3 = new Task('task 3, 2');
    tDList.addTask(task3);
    tDList.delTask({ index: 1 });
    expect(tDList.tasks.length).toBe(2);
    tDList.clear();
  });
});
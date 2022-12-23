/*
  * @jest-environment jsdom
 */

import Task from './task.js';
import { todoList, deleteAllCompleted, getAllCompleted } from './crud.js';

describe('Testing editing and updating funtion', () => {
  test('Testing edit tasks', () => {
    const task = new Task('todo 1');
    todoList.addTask(task);
    task.description = 'task number 1';
    expect(task.description).toBe('task number 1');
    todoList.clear();
  });

  test('Testing completed task', () => {
    const task = new Task('task 1');
    todoList.addTask(task);
    task.setCompleted({ completed: true });
    expect(todoList.tasks[0]).toBeTruthy();
    todoList.clear();
  });

  test('Testing clear all completed task', () => {
    const task1 = new Task('task 1');
    todoList.addTask(task1);
    const task2 = new Task('task 2');
    todoList.addTask(task2);
    const task3 = new Task('task 3');
    todoList.addTask(task3);
    todoList.tasks[0].setCompleted({ completed: true });
    todoList.save();
    todoList.tasks[1].setCompleted({ completed: true });
    todoList.save();
    todoList.tasks[2].setCompleted({ completed: true });
    todoList.save();
    const tasks = getAllCompleted();
    deleteAllCompleted(tasks);
    expect(todoList.tasks.length).toBe(0);
    todoList.clear();
  });
});

/*
  * @jest-environment jsdom
 */


import TodoLS from './todols.js';
import Task from './task.js';

describe('Testing editing and updating funtion', () => {
    test('Testing edit tasks', () => {
        const toDoList = new TodoLS();
        const task = new Task('todo 1' ,0);
        toDoList.addTask(task);
        task.description = 'task number 1';
        expect(task.description).toBe('task number 1');
    });

    test('Testing completed task', () => {
        const toDoList = new TodoLS();
        const task = new Task('task 1', 0);
        toDoList.addTask(task);
        task.setCompleted({completed: true});
        expect(toDoList.tasks[0]).toBeTruthy();
    });
});

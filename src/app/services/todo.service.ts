import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Todo } from '../model/todo';

/**
 * Todo service.
 *
 * FIXME: Use a REST-ful backend, currently using an in-memory array for testing purposes.
 */
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos = [
    {
      id: 1,
      completed: false,
      title: "Buy Groceries"
    },
    {
      id: 2,
      completed: true,
      title: "Write Ninja Report"
    },
    {
      id: 3,
      completed: false,
      title: "Pay credit card bill"
    }
  ];

  constructor() { }

  /**
   * Fetches all todos.
   */
  fetchAll() {
    return of(this.todos);
  }

  /**
   * Find a todo by id.
   *
   * @param id todo id
   */
  findById(id: number) {
    return this.todos.find(todo => todo.id === id);
  }

  /**
   * Update the todo's completed flag
   *
   * @param id the todo id.
   * @param flag if the todo is completed?
   */
  markAsComplete(id: number, flag: boolean) {
    const todo = this.findById(id);
    if (todo)
      todo.completed = flag;
  }

  /**
   * Adds a new todo to the array.
   *
   * @param todo the todo to be added
   */
  create(todo: Todo) {
    if (!todo)
      throw new Error("Todo cannot be null");

    this.todos.push(todo);
  }

  /**
   * Dummy implementation: just removes the item from the array.
   *
   * @param id the todo id to be deleted
   */
  delete(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}

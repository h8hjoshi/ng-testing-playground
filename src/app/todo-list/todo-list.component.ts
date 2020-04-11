import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];

  constructor() { }

  ngOnInit(): void {
    console.log("Init");
    this.todos = [
      {
        completed: false,
        title: "Buy Groceries"
      },
      {
        completed: true,
        title: "Write Ninja Report"
      },
      {
        completed: false,
        title: "Pay credit card bill"
      }
    ]
  }

}

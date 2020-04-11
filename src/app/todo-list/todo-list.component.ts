import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    console.log("Init");
    this.todoService.fetchAll().subscribe(todos => {
      this.todos = todos;
    });
  }

  showDetails(todo: Todo) {
    console.log("Showing the detail item", todo);
  }
}

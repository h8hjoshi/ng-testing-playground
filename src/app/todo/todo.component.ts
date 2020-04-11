import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../model/todo';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todo: Todo;

  constructor(private activatedRoute: ActivatedRoute, private todoService: TodoService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get("id");
      console.log("Fetching details for Todo: ", id);
      this.todo = this.todoService.findById(id);
    });
  }

  toggle() {
    this.todoService.markAsComplete(this.todo.id, !this.todo.completed);
  }
}

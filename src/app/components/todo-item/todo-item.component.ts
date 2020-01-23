import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() delete: EventEmitter<Todo> = new EventEmitter();;

  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  setClasses() {
    return {
      todo: true,
      'is-completed': this.todo.completed
    };
  }

  toggle(todo: Todo) {
    this.todoService
      .toggleCompleted(todo)
      .subscribe(() => todo.completed = !todo.completed);
  }

  destroy(todo: Todo) {
    this.todoService
      .deleteTodo(todo)
      .subscribe(() => this.delete.emit(todo));
  }
}

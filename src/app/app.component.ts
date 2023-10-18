import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TodosService } from './services/todos.service';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private _todos: Todo[] = [];
  activeTodos: Todo[] = [];

  get todos() {
    return this._todos;
  }

  set todos(todos: Todo[]) {
    if (todos == this._todos) {
      return;
    }
    this._todos = todos;
    this.activeTodos = this.todos.filter(todo => !todo.completed);
  }

  constructor(
    private todosService: TodosService,
  ) {}

  ngOnInit(): void {
    this.todosService.getTodos()
      .subscribe((todos) => {
        this.todos = todos;
      })
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(newTitle: string) {
    this.todosService.createTodo(newTitle)
    .subscribe((newTodo) => {
      this.todosService.getTodos()
            .subscribe((todos) => {
              this.todos = todos;
            })
    });


  }

  renameTodo(todoId: number, title: string) {
    this.todos = this.todos.map(todo => {
    return todo.id !== todoId ? todo : {...todo, title:title}
    })
  }

  toggleTodo(todoId: number) {
    this.todos = this.todos.map(todo => {
    return todo.id !== todoId ? todo : {...todo, completed:!todo.completed}
    })
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos.filter(todo => todo.id !== todoId);

  }
}

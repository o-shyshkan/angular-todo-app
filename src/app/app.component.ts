import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Todo } from 'src/app/types/todo';

const todosFromServer = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS', completed: true },
  { id: 3, title: 'React', completed: false },
  { id: 4, title: 'Vue.js', completed: false },
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  _todos: Todo[] = [];
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

  ngOnInit(): void {
    this.todos = todosFromServer;
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(newTitle: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title: newTitle,
      completed: false
    };

    this.todos = [...this.todos, newTodo];
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

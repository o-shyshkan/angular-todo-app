import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Todo } from 'src/app/types/todo';

const todos = [
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
export class AppComponent {
  todos = todos;

  todoForm = new FormGroup({

    title: new FormControl('', {
    nonNullable:true,
    validators:[
    Validators.required,
    Validators.minLength(3),
    ]})

  });

  get title() {
    return this.todoForm.get('title') as FormControl;
  }

  get activeTodos() {
    console.log('calculating todo');
    return this.todos.filter(todo => !todo.completed);
  }


  trackById(i: number, todo: Todo) {
    return todo.id;
  }


  handleFormSubmit() {
    if (this.todoForm.invalid) {
      return;
    }

    this.addTodo(this.title.value)

    this.todoForm.reset();
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
}

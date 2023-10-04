import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Output() delete = new EventEmitter();
  @Input() todo!: Todo;

  editing = false;
}

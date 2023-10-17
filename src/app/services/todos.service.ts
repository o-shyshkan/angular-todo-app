import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../types/todo';

const todosFromServer: Todo[] = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS', completed: true },
  { id: 3, title: 'React', completed: false },
  { id: 4, title: 'Vue.js', completed: false },
];

const USER_ID = '6548'
const API_URL = 'https://mate.academy/students-api'


@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(
    private http : HttpClient,
  ) { }

  getTodos() {
    //return todosFromServer;
    return this.http.get<Todo[]>(`${API_URL}/todos?userId=${USER_ID}`);
  }
}

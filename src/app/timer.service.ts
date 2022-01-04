import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor(private http:HttpClient) { }
  getCurrentDate(){
    // return new Date().toLocaleString()
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }
}

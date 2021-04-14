import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentList(): Observable<any> {
    return this.http.get('https://reqres.in/api/users');
  }

  getStudent(id: number): Observable<any>{
    return this.http.get(`https://reqres.in/api/users/${id}`);
  }

}

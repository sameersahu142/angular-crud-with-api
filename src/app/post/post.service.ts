import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiURL = "http://localhost:3000";

  public latestUserData = [
    {
      "id": 1,
      "title": "sunt excepturi optio reprehenderit",
      "body": "quia recusandae consequuntur expedita."
    },
    {
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint."
    },
    {
      "id": 3,
      "title": "eum et est occaecati",
      "body": "ullam et saepe reiciendis voluptatem adipisc."
    }
  ]

  httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor (private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/users/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  createData(post:User): Observable<any> {
    return this.httpClient.post(this.apiURL + '/users/', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  findData(id:number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/users/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updateData(id:number, post:User): Observable<any> {
    return this.httpClient.put(this.apiURL + '/users/' + id, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteData(id:number) {
    return this.httpClient.delete(this.apiURL + '/users/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

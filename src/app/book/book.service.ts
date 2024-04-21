import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  env = environment.api_url;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll():Observable<any> {
    return this.httpClient.get(`${this.env}/getAll`).pipe(
      catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }));
  }

  getByISBN(ISBN: any):Observable<any> {
    return this.httpClient.get(`${this.env}/getBooksByISBN/${ISBN}`).pipe(
      catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }));
  }

  create(book: Book):Observable<any> {
    return this.httpClient.post(`${this.env}/addBooks`, JSON.stringify(book), this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }));
  }

  update(ISBN: any, book: Book):Observable<any> {
    return this.httpClient.put(`${this.env}/updateBooksByISBN/${ISBN}`, JSON.stringify(book), this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }));
  }

  delete(ISBN: any):Observable<any> {
    return this.httpClient.delete(`${this.env}/deleteBooksByISBN/${ISBN}`).pipe(
      catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }));
  }
}

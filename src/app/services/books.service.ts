import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Book from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiURL = 'http://127.0.0.1:8000/api';

  private bookAddedSource = new Subject<Book>();
  bookAdded$ = this.bookAddedSource.asObservable();

  bookAdded(book: Book) {
    this.bookAddedSource.next(book);
  }
  constructor(private httpClient: HttpClient) {}

  getBooks(): Observable<Book[]> {

    return this.httpClient.get<Book[]>(`${this.apiURL}/books`);
  }
  getBookById(id: number): Observable<Book> {

    return this.httpClient.get<Book>(`${this.apiURL}/books/${id}`);
  }

  addBook(book: Book): Observable<Book> {

    return this.httpClient.post<Book>(`${this.apiURL}/books`, book);
  }

  deleteBook(id: number): Observable<Book> {

    return this.httpClient.delete<Book>(`${this.apiURL}/books/${id}`);
  }

  updateBook(book: Book): Observable<Book> {

    return this.httpClient.put<Book>(`${this.apiURL}/books/${book.id}`, book);
  }

}

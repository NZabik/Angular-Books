import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Author from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private apiURL = 'http://127.0.0.1:8000/api';

  private authorAddedSource = new Subject<Author>();
  authorAdded$ = this.authorAddedSource.asObservable();

  authorAdded(author: Author) {
    this.authorAddedSource.next(author);
  }
  constructor(private httpClient: HttpClient) {}

  getAuthors(): Observable<Author[]> {

    return this.httpClient.get<Author[]>(`${this.apiURL}/authors`);
  }

  getAuthorById(id: number): Observable<Author> {

    return this.httpClient.get<Author>(`${this.apiURL}/authors/${id}`);
  }

  addAuthor(author: Author): Observable<Author> {

    return this.httpClient.post<Author>(`${this.apiURL}/authors`, author);
  }

  deleteAuthor(id: number): Observable<Author> {

    return this.httpClient.delete<Author>(`${this.apiURL}/authors/${id}`);
  }

  updateAuthor(author: Author): Observable<Author> {

    return this.httpClient.put<Author>(`${this.apiURL}/authors/${author.id}`, author);
  }

}

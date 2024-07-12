import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Book from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiURL = 'http://127.0.0.1:8000/api';

  constructor(private httpClient: HttpClient) {}

  getBooks(): Observable<Book[]> {
    // Récupérer le token stocké localement
    const token = localStorage.getItem('currentUserToken');

    // Créer les headers de la requête, incluant le token d'authentification
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<Book[]>(`${this.apiURL}/books`, { headers });
  }
  getBookById(id: number): Observable<Book> {
    // Récupérer le token stocké localement
    const token = localStorage.getItem('currentUserToken');

    // Créer les headers de la requête, incluant le token d'authentification
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<Book>(`${this.apiURL}/books/${id}`, { headers });
  }

  addBook(book: Book): Observable<Book> {
    // Récupérer le token stocké localement
    const token = localStorage.getItem('currentUserToken');

    // Créer les headers de la requête, incluant le token d'authentification
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<Book>(`${this.apiURL}/books`, book, { headers });
  }

  deleteBook(id: number): Observable<Book> {
    // Récupérer le token stocké localement
    const token = localStorage.getItem('currentUserToken');

    // Créer les headers de la requête, incluant le token d'authentification
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.delete<Book>(`${this.apiURL}/books/${id}`, { headers });
  }

  updateBook(book: Book): Observable<Book> {
    // Récupérer le token stocké localement
    const token = localStorage.getItem('currentUserToken');

    // Créer les headers de la requête, incluant le token d'authentification
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.put<Book>(`${this.apiURL}/books/${book.id}`, book, { headers });
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Author from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private apiURL = 'http://127.0.0.1:8000/api';

  constructor(private httpClient: HttpClient) {}

  getAuthors(): Observable<Author[]> {
    // Récupérer le token stocké localement
    const token = localStorage.getItem('currentUserToken');

    // Créer les headers de la requête, incluant le token d'authentification
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<Author[]>(`${this.apiURL}/authors`, { headers });
  }

  getAuthorById(id: number): Observable<Author> {
    // Récupérer le token stocké localement
    const token = localStorage.getItem('currentUserToken');

    // Créer les headers de la requête, incluant le token d'authentification
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<Author>(`${this.apiURL}/authors/${id}`, { headers });
  }

  addAuthor(author: Author): Observable<Author> {
    // Récupérer le token stocké localement
    const token = localStorage.getItem('currentUserToken');

    // Créer les headers de la requête, incluant le token d'authentification
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<Author>(`${this.apiURL}/authors`, author, { headers });
  }

  deleteAuthor(id: number): Observable<Author> {
    // Récupérer le token stocké localement
    const token = localStorage.getItem('currentUserToken');

    // Créer les headers de la requête, incluant le token d'authentification
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.delete<Author>(`${this.apiURL}/authors/${id}`, { headers });
  }

  updateAuthor(author: Author): Observable<Author> {
    // Récupérer le token stocké localement
    const token = localStorage.getItem('currentUserToken');

    // Créer les headers de la requête, incluant le token d'authentification
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.put<Author>(`${this.apiURL}/authors/${author.id}`, author, { headers });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://127.0.0.1:8000/api/login_check';
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  get isLoggedInObservable() {
    return this.loggedIn.asObservable();
  }
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { username, password }).pipe(
      map((response: any) => {
        // Supposons que l'API renvoie un objet avec un token
        if (response && response.token) {
          // Stocker le token dans le stockage local
          localStorage.setItem('currentUserToken', response.token);
          // Mettre à jour le BehaviorSubject pour indiquer que l'utilisateur est connecté
          this.loggedIn.next(true);
          return response.token;
        }
        return null;
      })
    );
  }

  logout(): void {
    // Supprimer le token du stockage local ou de la méthode de stockage utilisée
    localStorage.removeItem('currentUserToken');
    this.loggedIn.next(false);
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn() {
    return !!localStorage.getItem('currentUserToken');
  }

  decodeToken(): any {
    const token = localStorage.getItem('currentUserToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    }
    return null;
  }
}

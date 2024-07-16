import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registerUrl = 'http://127.0.0.1:8000/api/register';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }
}

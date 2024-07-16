// import { Injectable, inject } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { LoginService } from './login.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthInterceptorService implements HttpInterceptor {

//   constructor(private loginService: LoginService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // const auth = inject(LoginService);
//     const authToken = localStorage.getItem('currentUserToken');

//     // Cloner la requête pour ajouter le token d'authentification dans les en-têtes
//     const authReq = req.clone({
//       headers: req.headers.set('Authorization', 'Bearer ' + authToken)
//     });

//     // Passer la requête clonée au lieu de l'originale
//     return next.handle(authReq);
//   }
// }

// // Fournir l'intercepteur
// export const AuthInterceptorProvider = {
//   provide: HTTP_INTERCEPTORS,
//   useClass: AuthInterceptorService,
//   multi: true
// };
import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const auth = inject(LoginService);
  // const token = auth.token()
  const token = localStorage.getItem('currentUserToken');
  if (!token) {
    return next(req)
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  })

  const newReq = req.clone({
    headers
  })

  return next(newReq)
}

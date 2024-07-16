import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

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

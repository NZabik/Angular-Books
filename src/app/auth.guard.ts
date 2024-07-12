import { LoginService } from './services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private LoginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.LoginService.isLoggedIn() && this.LoginService.decodeToken().roles[0] === 'ROLE_ADMIN'){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

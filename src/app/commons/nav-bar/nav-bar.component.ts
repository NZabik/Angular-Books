import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit, OnDestroy {
  user!: any;
  isUserLoggedIn: boolean = false;
  private authSubscription!: Subscription;
  constructor(private loginService: LoginService, private router: Router) {}


  logout() {
    this.loginService.logout();
    alert('Déconnexion réussie');
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.authSubscription = this.loginService.isLoggedInObservable.subscribe(
      (isLoggedIn) => {
        this.isUserLoggedIn = isLoggedIn;
        this.user = this.loginService.decodeToken();
      }
    );
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}

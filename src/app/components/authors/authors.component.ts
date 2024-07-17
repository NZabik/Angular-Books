import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import Author from '../../models/author.model';
import { AuthorsService } from '../../services/authors.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css',
})
export class AuthorsComponent implements OnInit, OnDestroy {
  isUserLoggedIn: boolean = false;
  private authSubscription!: Subscription;
  authors: Author[] = [];
  user!: any;
  constructor(
    private loginService: LoginService,
    private authorService: AuthorsService,
    private router: Router
  ) {
    this.user = this.loginService.decodeToken();
  }

  deleteAuthor(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce livre ?')) {
      this.authorService.deleteAuthor(id).subscribe({
        next: () => {
          this.authors = this.authors.filter((author) => author.id !== id);
        },
        error: (error) =>
          console.error(
            "Erreur lors de la suppression de l'utilisateur",
            error
          ),
      });
    }
  }

  editAuthor(authorId: number): void {
    this.router.navigate(['/editAuthor', authorId]);
  }

  ngOnInit() {
    this.authSubscription = this.loginService.isLoggedInObservable.subscribe(
      (isLoggedIn) => {
        this.isUserLoggedIn = isLoggedIn;
      }
    );
    if (this.loginService.isLoggedIn()) {
      this.authorService.authorAdded$.subscribe((author: Author) => {
        this.authors.push(author);
      });
      this.authorService.getAuthors().subscribe((authors) => {
        this.authors = authors;
      });
    }
  }
  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { BooksService } from '../../services/books.service';
import { Subscription } from 'rxjs';
import Book from '../../models/book.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit, OnDestroy {
  isUserLoggedIn: boolean = false;
  private authSubscription!: Subscription;
  books: Book[] = [];
  user!: any;
  constructor(
    private loginService: LoginService,
    private booksService: BooksService,
    private router: Router
  ) {
    this.user = this.loginService.decodeToken();
  }

  deleteBook(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce livre ?')) {
      this.booksService.deleteBook(id).subscribe({
        next: () => {
          this.books = this.books.filter((book) => book.id !== id);
        },
        error: (error) =>
          console.error(
            "Erreur lors de la suppression de l'utilisateur",
            error
          ),
      });
    }
  }
  editBook(bookId: number): void {
    this.router.navigate(['/editBook', bookId]);
  }

  ngOnInit() {
    this.authSubscription = this.loginService.isLoggedInObservable.subscribe(
      (isLoggedIn) => {
        this.isUserLoggedIn = isLoggedIn;
      }
    );
    if (this.loginService.isLoggedIn()) {
      this.booksService.bookAdded$.subscribe((book: Book) => {
        this.books.push(book);
      });
      this.booksService.getBooks().subscribe((books) => {
        this.books = books;
      });
    }
  }
  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { BooksService } from '../../services/books.service';
import { Subscription } from 'rxjs';
import Book from '../../models/book.model';
import Author from '../../models/author.model';
import { Router, RouterLink } from '@angular/router';
import { AuthorsService } from '../../services/authors.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  authors: Author[] = [];
  books: Book[] = [];

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorsService,
    private bookService: BooksService,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      coverText: ['', Validators.required],
      comment: [''],
      idAuthor: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    this.authorService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });
  }
  onSubmit(): void {
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
      this.bookService.addBook(this.bookForm.value).subscribe({
        next: (response) => {
          alert('Livre ajouté avec succès');
          this.books.push(response);
          this.bookForm.reset();
          // this.router.navigate(['/books']);
        },
        error: (error) => {
          console.error("Erreur lors de l'ajout du livre", error);
        },
      });
    }
  }
}

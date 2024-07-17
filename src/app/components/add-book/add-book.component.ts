import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import Book from '../../models/book.model';
import Author from '../../models/author.model';
import { Router, RouterLink } from '@angular/router';
import { AuthorsService } from '../../services/authors.service';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddAuthorComponent } from '../add-author/add-author.component';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, AddAuthorComponent, FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  authors: Author[] = [];
  books: Book[] = [];
  selectedAuthor: Author | null = null;

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
    this.authorService.authorAdded$.subscribe((author: Author) => {
      this.authors.push(author);
    });
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
          this.bookService.bookAdded(response);
          this.books.push(response);
          this.bookForm.reset();
          this.router.navigate(['/books']);
        },
        error: (error) => {
          console.error("Erreur lors de l'ajout du livre", error);
        },
      });
    }
  }
}

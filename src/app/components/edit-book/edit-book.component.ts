import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent implements OnInit {
  bookId: string;
  editBookForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private bookService: BooksService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.bookId = '';
    this.editBookForm = this.fb.group({
      title: ['', Validators.required],
      coverText: ['', Validators.required],
      comment: [''],
    });
  }
  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    const bookIdNumber = parseInt(this.bookId, 10);
    this.bookService.getBookById(bookIdNumber).subscribe((book) => {
      this.editBookForm.setValue({
        title: book.title,
        coverText: book.coverText,
        comment: book.comment,
      });
    });
  }

  onSubmit(): void {
    const updatedBook = {
      id: this.bookId,
      ...this.editBookForm.value,
    };

    this.bookService.updateBook(updatedBook).subscribe({
      next: (response) => {
        console.log('Livre mis à jour avec succès', response);
        this.router.navigate(['/books']);
      },
      error: (error) =>
        console.error('Erreur lors de la mise à jour du livre', error),
    });
  }
}

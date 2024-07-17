import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Author from '../../models/author.model';
import { AuthorsService } from '../../services/authors.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-author',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.css',
})
export class AddAuthorComponent {
  authorForm: FormGroup;
  authors: Author[] = [];

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorsService,
    private router: Router
  ) {
    this.authorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }
onSubmit(): void {
    if (this.authorForm.valid) {
      console.log(this.authorForm.value);
      this.authorService.addAuthor(this.authorForm.value).subscribe({
        next: (response) => {
          alert('Auteur ajouté avec succès');
          this.authorService.authorAdded(response);
          this.authors.push(response);
          this.authorForm.reset();
          // this.router.navigate(['/authors']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }





}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorsService } from '../../services/authors.service';

@Component({
  selector: 'app-edit-author',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-author.component.html',
  styleUrl: './edit-author.component.css'
})
export class EditAuthorComponent implements OnInit {
  authorId: string;
  editAuthorForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.authorId = '';
    this.editAuthorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authorId = this.route.snapshot.paramMap.get('id')!;
    const authorIdNumber = parseInt(this.authorId, 10);
    this.authorService.getAuthorById(authorIdNumber).subscribe((author) => {
      this.editAuthorForm.setValue({
        firstName: author.firstName,
        lastName: author.lastName
      });
    });
  }

  onSubmit(): void {
    // Création de l'objet auteur à partir des valeurs du formulaire
    const updatedAuthor = {
      id: this.authorId,
      ...this.editAuthorForm.value
    };

    // Appel de updateAuthor pour mettre à jour l'auteur
    this.authorService.updateAuthor(updatedAuthor).subscribe({
      next: (response) => {
        console.log('Auteur mis à jour avec succès', response);
        this.router.navigate(['/authors']); // Redirection après la mise à jour
      },
      error: (error) => console.error('Erreur lors de la mise à jour de l\'auteur', error)
    });
  }
}

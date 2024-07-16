import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from './../../services/register.service';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css',
})
export class UserRegistrationComponent {
  userForm: FormGroup;
  users!: any[];

  constructor(
    private RegisterService: RegisterService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.RegisterService.register(this.userForm.value).subscribe({
        next: (response) => {
          alert('Utilisateur ajouté avec succès');
          this.userForm.reset();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}

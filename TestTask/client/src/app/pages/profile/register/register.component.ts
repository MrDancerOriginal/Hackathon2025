import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistrationRequestDto } from '../../../models/user-registration-request';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles = ['Shelter', 'Volunteer'];
  errorMessages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessages = [];

    if (this.registerForm.valid) {
      const userData: UserRegistrationRequestDto = this.registerForm.value;

      this.authService.register(userData).subscribe({
        next: (response) => {
          if (response.result && response.token && response.id) {
            this.authService.storeToken(response.token, response.id);
            this.router.navigate(['']); // Redirect to home or dashboard
          } else if (response.errors) {
            this.errorMessages = response.errors;
          }
        },
        error: (err) => {
          this.errorMessages = err.error?.errors || ['An error occurred during registration'];
        }
      });
    }
  }
}

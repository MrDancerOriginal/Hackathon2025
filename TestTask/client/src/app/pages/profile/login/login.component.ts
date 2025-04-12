import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginRequestDto } from '../../../models/user-login-request';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessages = [];

    if (this.loginForm.valid) {
      const loginData: UserLoginRequestDto = this.loginForm.value;

      this.authService.login(loginData).subscribe({
        next: (response) => {
          if (response.result && response.token && response.id) {
            this.authService.storeToken(response.token, response.id);
            this.router.navigate(['/']); // Redirect to home or dashboard
          } else if (response.errors) {
            this.errorMessages = response.errors;
          }
        },
        error: (err) => {
          this.errorMessages = err.error?.errors || ['An error occurred during login'];
        }
      });
    }
  }
}

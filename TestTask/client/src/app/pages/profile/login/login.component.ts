import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginRequestDto } from '../../../models/user-login-request';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService
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
            this.toastr.success("Успішна авторизація");
            this.router.navigate(['/']); // Redirect to home or dashboard
          } else if (response.errors) {

            let message;
            message += response.errors.map(error => error);

            this.toastr.error(message);
            this.errorMessages = response.errors;
          }
        },
        error: (err) => {
          this.toastr.error(err);
          this.errorMessages = err.error?.errors || ['An error occurred during login'];
        }
      });
    }
  }
  togglePassword(): void {
    const input: any = document.getElementById('password');
    const icon: any = document.getElementById('toggleIcon');
    if (input.type === 'password') {
      input.type = 'text';
      icon.src = 'icons/close-eye.png';
      icon.className = 'h-[18px] w-[18px]';
    } else {
      input.type = 'password';
      icon.src = 'icons/eye.png';
      icon.className = 'h-4 w-4';
    }
  }
}

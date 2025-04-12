import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistrationRequestDto } from '../../../models/user-registration-request';
import { AuthService } from '../../../services/auth.service';
import { ShelterService } from '../../../services/shelter.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles = ['Shelter', 'Volunteer'];
  shelterCategories = ['Ветклініка', 'Притулок для собак та котів', 'Розплідник', 'Інше'];
  errorMessages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private shelterService: ShelterService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      // Додаткові поля для Shelter
      category: [''],
      address: [''],
      phoneNumber: ['']
    });

    this.updateFormValidation();
  }

  onRoleChange(): void {
    this.updateFormValidation();
  }

  private updateFormValidation(): void {
    const isShelter = this.registerForm.get('role')?.value === 'Shelter';

    const categoryControl = this.registerForm.get('category');
    const addressControl = this.registerForm.get('address');
    const phoneNumberControl = this.registerForm.get('phoneNumber');

    if (isShelter) {
      categoryControl?.setValidators([Validators.required]);
      addressControl?.setValidators([Validators.required]);
      phoneNumberControl?.setValidators([Validators.required]);
    } else {
      categoryControl?.clearValidators();
      addressControl?.clearValidators();
      phoneNumberControl?.clearValidators();
    }

    categoryControl?.updateValueAndValidity();
    addressControl?.updateValueAndValidity();
    phoneNumberControl?.updateValueAndValidity();
  }

  onSubmit(): void {
    this.errorMessages = [];

    if (this.registerForm.valid) {
      const userData: UserRegistrationRequestDto = {
        name: this.registerForm.get('name')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        role: this.registerForm.get('role')?.value
      };

      // Реєстрація користувача
      this.authService.register(userData).subscribe({
        next: (response) => {
          if (response.result && response.token && response.id) {
            this.authService.storeToken(response.token, response.id);

            // Якщо це Shelter - реєструємо притулок
            if (userData.role === 'Shelter') {
              const shelterData = {
                name: userData.name,
                address: this.registerForm.get('address')?.value,
                phone: this.registerForm.get('phoneNumber')?.value,
                category: this.registerForm.get('category')?.value
              };

              this.shelterService.addShelter(shelterData).subscribe({
                next: (shelterResponse) => {
                  console.log('Shelter registered successfully', shelterResponse);
                  this.router.navigate(['']); // Перенаправлення після успішної реєстрації
                },
                error: (shelterError) => {
                  console.error('Shelter registration failed', shelterError);
                  this.errorMessages = shelterError.error?.errors || ['Shelter registration failed'];
                }
              });
            } else {
              this.router.navigate(['']); // Перенаправлення для Volunteer
            }
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

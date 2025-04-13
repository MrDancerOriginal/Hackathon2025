import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistrationRequestDto } from '../../../models/user-registration-request';
import { AuthService } from '../../../services/auth.service';
import { ShelterService } from '../../../services/shelter.service';
import { ShelterCategory } from '../../../enums/shelter-category.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles = ['Shelter', 'Volunteer'];
  shelterCategories = [
    ShelterCategory.DogCatShelter,
    ShelterCategory.Kennel,
    ShelterCategory.VetClinic
  ];
  errorMessages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private shelterService: ShelterService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      location: ['', Validators.required],
      phone: ['', Validators.required],
      // Additional fields for Shelter
      shelterName: [''],
      address: [''],
      category: [''],
      // Additional field for Volunteer
      fullName: ['']
    });

    this.updateFormValidation();
  }

  onRoleChange(): void {
    this.updateFormValidation();
  }

  private updateFormValidation(): void {
    const isShelter = this.registerForm.get('role')?.value === 'Shelter';

    // Common fields
    const locationControl = this.registerForm.get('location');
    const phoneControl = this.registerForm.get('phone');

    // Shelter-specific fields
    const shelterNameControl = this.registerForm.get('shelterName');
    const addressControl = this.registerForm.get('address');
    const categoryControl = this.registerForm.get('category');

    // Volunteer-specific field
    const fullNameControl = this.registerForm.get('fullName');

    // Common fields always required
    locationControl?.setValidators([Validators.required]);
    phoneControl?.setValidators([Validators.required]);

    if (isShelter) {
      shelterNameControl?.setValidators([Validators.required]);
      addressControl?.setValidators([Validators.required]);
      categoryControl?.setValidators([Validators.required]);
      fullNameControl?.clearValidators();
    } else {
      fullNameControl?.setValidators([Validators.required]);
      shelterNameControl?.clearValidators();
      addressControl?.clearValidators();
      categoryControl?.clearValidators();
    }

    locationControl?.updateValueAndValidity();
    phoneControl?.updateValueAndValidity();
    shelterNameControl?.updateValueAndValidity();
    addressControl?.updateValueAndValidity();
    categoryControl?.updateValueAndValidity();
    fullNameControl?.updateValueAndValidity();
  }

  onSubmit(): void {
    this.errorMessages = [];

    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      // Prepare the data exactly as backend expects
      const requestData: UserRegistrationRequestDto = {
        role: formValue.role,
        email: formValue.email,
        password: formValue.password,
        location: formValue.location,
        phone: formValue.phone,
        ...(formValue.role === 'Shelter' ? {
          shelterName: formValue.shelterName,
          address: formValue.address,
          category: formValue.category
        } : {
          fullName: formValue.fullName
        })
      };

      this.authService.register(requestData).subscribe({
        next: (response) => {
          if (response.result && response.token && response.id) {
            this.authService.storeToken(response.token, response.id);
            this.router.navigate(['']);
          } else if (response.errors) {
            this.errorMessages = response.errors;
          }
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.errorMessages = err.error?.errors || ['Registration failed. Please try again.'];
        }
      });
    }
  }
}

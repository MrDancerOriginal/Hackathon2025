import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { ToastrService } from 'ngx-toastr';
import { AnimalsService } from '../../../services/animals.service';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrl: './add-animal.component.scss'
})
export class AddAnimalComponent {

  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  public uploader: FileUploader = new FileUploader({
    url: 'YOUR_UPLOAD_URL_HERE', // наприклад, http://localhost:3000/upload
    isHTML5: true
  });
  public hasBaseDropZoneOver: boolean = false;

  constructor(
    private animalService : AnimalsService,
    private fb: FormBuilder,
    private router: Router,
    private toastr : ToastrService
    ) { }

  ngOnInit(): void {
    this.toastr.success("Nice", "Good");
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(24)]],
      description: [''],
      species : ['', [Validators.required, Validators.minLength(1), Validators.maxLength(24)]],
      age: ['', [Validators.required]],
      health: ['', [Validators.required]],
    });

  }



  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  register() {

    const shelterId = 1;

    const values = { shelterId, ...this.registerForm.value};

    this.animalService.addAnimal(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/animals');
      },
      error: error => {
        if (error && error.error && Array.isArray(error.error)) {
          this.validationErrors = error.error; // якщо помилка містить масив
        } else {
          this.validationErrors = [error.message || 'Щось пішло не так']; // якщо це не масив, перетворюємо на масив
        }
      }
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}

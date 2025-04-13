import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { AnimalsService } from '../../../services/animals.service';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss']
})
export class AddAnimalComponent {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  isUploading = false;

  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean = false;
  animalTypes: string[] = ['Кіт', 'Собака', 'Гризун', 'Птах', 'Інше'];
  cities: string[] = ['Київ', 'Львів', 'Харків', 'Одеса', 'Дніпро', 'Запоріжжя', 'Інше'];

  constructor(
    private animalService: AnimalsService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {

    this.uploader = new FileUploader({
      url: `${environment.apiUrl}animals`, // Set the URL here
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      method: 'POST',
      disableMultipart: false // Ensure multipart is enabled
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.setupUploader();
  }

  initForm() {
    this.registerForm = this.fb.group({
      species: ['', Validators.required],
      city: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      name: ['', Validators.maxLength(24)],
      health: ['', Validators.maxLength(24)],
      description: ['', Validators.maxLength(100)]
    });
  }

  setupUploader() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
      switch (filter.name) {
        case 'fileSize':
          this.toastr.error(`File ${item.name} is too large. Max size is 10MB.`);
          break;
        case 'fileType':
          this.toastr.error(`File ${item.name} has invalid type. Only images are allowed.`);
          break;
        default:
          this.toastr.error(`Error adding file ${item.name}`);
      }
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  register() {
    if (this.isUploading || !this.registerForm.valid) return;

    this.isUploading = true;
    const shelterId = this.authService.getUserId();
    const formData = new FormData();

    // Append all required fields, even if empty
    formData.append('ShelterId', shelterId.toString());
    formData.append('Name', this.registerForm.get('name')?.value || '');
    formData.append('Description', this.registerForm.get('description')?.value || '');
    formData.append('Species', this.registerForm.get('species')?.value || '');
    formData.append('Age', this.registerForm.get('age')?.value || '');
    formData.append('Health', this.registerForm.get('health')?.value || '');
    formData.append('UserId', this.authService.getUserId());

    // Append photos if any
    if (this.uploader.queue.length > 0) {
      this.uploader.queue.forEach((fileItem: FileItem) => {
        formData.append('Photos', fileItem._file);
      });
    } else {
      formData.append('Photos', new Blob(), ''); // Send empty file if no photos
    }

    this.animalService.addAnimal(formData, this.authService.getUserId()).subscribe({
      next: () => {
        this.toastr.success('Оголошення успішно додано');
        this.router.navigateByUrl('/animals');
      },
      error: (error) => {
        this.isUploading = false;
        console.error('Error:', error);

        if (error.error) {
          // Handle different error formats
          if (typeof error.error === 'string') {
            this.validationErrors = [error.error];
          } else if (Array.isArray(error.error)) {
            this.validationErrors = error.error;
          } else if (error.error.errors) {
            // this.validationErrors = Object.values(error.error.errors).flat();
            console.log(Object.values(error.error.errors).flat());
          } else {
            this.validationErrors = ['Сталася невідома помилка'];
          }
        } else {
          this.validationErrors = ['Помилка сервера'];
        }
      },
      complete: () => {
        this.isUploading = false;
      }
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}

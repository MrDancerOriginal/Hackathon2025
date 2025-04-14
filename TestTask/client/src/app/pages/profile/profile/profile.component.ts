import { Component } from '@angular/core';
import { Shelter } from '../../../models/shelter.interface';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { Volunteer } from '../../../models/volunteer';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userRole: string = '';
  shelterData: Shelter | null = null;
  volunteerData: Volunteer | null = null;
  loading = true;

  // Edit profile
  showEditModal = false;
  editForm: FormGroup;

  // Photo upload
  showPhotoUploadModal = false;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      address: [''],
      interests: [''],
      location: [''],
      category: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserInfo().subscribe({
      next: (result) => {
        this.userRole = result.role;
        if (result.role === 'Shelter') {
          this.shelterData = result.data as Shelter;
          this.prepareEditForm(this.shelterData);
        } else if (result.role === 'Volunteer') {
          this.volunteerData = result.data as Volunteer;
          this.prepareEditForm(this.volunteerData);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load user data', err);
        this.loading = false;
      }
    });
  }

  prepareEditForm(data: any): void {
    const formData = {
      name: data.name,
      phone: data.phone || '',
      address: data.address || '',
      interests: data.interests || '',
      location: data.location || '',
      category: data.category || ''
    };

    this.editForm.patchValue(formData);
  }

  getImageUrl(imagePath: string | undefined): string {
    if (!imagePath) return '';
    const normalizedPath = imagePath.replace(/\\/g, '/');
    return `https://localhost:7077/${normalizedPath}`;
  }

  handleImageError(event: any): void {
    event.target.src = 'assets/default-profile-image.png';
    event.target.onerror = null;
  }

  // Edit profile methods
  openEditModal(): void {
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  // Photo upload methods
  openPhotoUploadModal(): void {
    this.showPhotoUploadModal = true;
    this.selectedFile = null;
    this.previewUrl = null;
  }

  closePhotoUploadModal(): void {
    this.showPhotoUploadModal = false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large. Maximum size is 5MB');
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('Invalid file type. Only JPG, PNG or GIF allowed');
        return;
      }

      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeSelectedFile(): void {
    this.selectedFile = null;
    this.previewUrl = null;
  }

  // profile.component.ts
uploadPhoto(): void {
  if (!this.selectedFile) return;

  const formData = new FormData();
  formData.append('Photo', this.selectedFile);

  if (this.userRole === 'Volunteer' && this.volunteerData) {
    console.log('Uploading volunteer photo to:',
      `/Volunteer/byUserId/${this.volunteerData.userId}`);

    this.userService.updateVolunteer(this.volunteerData.userId, formData).subscribe({
      next: (response) => {
        console.log('Upload successful:', response);
        this.closePhotoUploadModal();
        this.loadUserData();
        alert('Photo updated successfully!');
      },
      error: (err) => {
        console.error('Upload error:', {
          status: err.status,
          message: err.message,
          url: err.url,
          error: err.error
        });
        alert(`Failed to upload photo: ${err.status} ${err.statusText}`);
      }
    });
  } else if (this.userRole === 'Shelter' && this.shelterData) {
    console.log('Uploading shelter photo to:',
      `/Shelter/${this.shelterData.userId}`);

    this.userService.updateShelter(this.shelterData.userId.toString(), formData).subscribe({
      next: (response) => {
        console.log('Upload successful:', response);
        this.closePhotoUploadModal();
        this.loadUserData();
        alert('Photo updated successfully!');
      },
      error: (err) => {
        console.error('Upload error:', {
          status: err.status,
          message: err.message,
          url: err.url,
          error: err.error
        });
        alert(`Failed to upload photo: ${err.status} ${err.statusText}`);
      }
    });
  }
}
  onSubmit(): void {
    if (this.editForm.invalid) return;

    const formData = new FormData();
    const formValues = this.editForm.value;

    // Append all form values to FormData
    Object.keys(formValues).forEach(key => {
      if (formValues[key] !== null && formValues[key] !== undefined) {
        formData.append(key.charAt(0).toUpperCase() + key.slice(1), formValues[key]);
      }
    });

    if (this.userRole === 'Shelter' && this.shelterData) {
      this.userService.updateShelter(this.shelterData.shelterId.toString(), formData).subscribe({
        next: (response) => {
          this.closeEditModal();
          this.loadUserData();
          alert('Profile updated successfully!');
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          alert('Failed to update profile. Please try again.');
        }
      });
    } else if (this.userRole === 'Volunteer' && this.volunteerData) {
      this.userService.updateVolunteer(this.volunteerData.userId, formData).subscribe({
        next: (response) => {
          this.closeEditModal();
          this.loadUserData();
          alert('Profile updated successfully!');
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          alert('Failed to update profile. Please try again.');
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

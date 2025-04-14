import { Component } from '@angular/core';
import { Shelter } from '../../../models/shelter.interface';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { Volunteer } from '../../../models/volunteer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userRole: string = '';
  shelterData: Shelter | null = null;
  volunteerData: Volunteer | null = null;
  loading = true;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserInfo().subscribe({
      next: (result) => {
        console.log()
        this.userRole = result.role;
        if (result.role === 'Shelter') {
          this.shelterData = result.data as Shelter;
          console.log(result.data)
        } else if (result.role === 'Volunteer') {
          this.volunteerData = result.data as Volunteer;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load user data', err);
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    // Redirect to login or home page
  }
}

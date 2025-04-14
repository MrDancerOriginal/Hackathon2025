import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit{

  role : string = "";
  @ViewChild('menu') menu!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;

  isMobileMenuOpen = false;
  isMobileView = false;

  /**
   *
   */
  constructor(private authService: AuthService, public userService : UserService) {
    console.log(this.isLoggedIn());
  }
  ngOnInit(): void {
    this.checkViewport();
    this.userService.getCurrentUserRole().subscribe(userRole => {
      this.role = userRole;
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.checkViewport();
  }

  checkViewport() {
    this.isMobileView = window.innerWidth < 1024; // lg breakpoint
    if (!this.isMobileView) {
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.menu) {
      if (this.isMobileMenuOpen) {
        this.menu.nativeElement.classList.remove('translate-x-full', 'opacity-0', 'pointer-events-none');
        this.menu.nativeElement.classList.add('translate-x-0', 'opacity-100', 'pointer-events-auto');
      } else {
        this.closeMobileMenu();
      }
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    if (this.menu) {
      this.menu.nativeElement.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
      this.menu.nativeElement.classList.remove('translate-x-0', 'opacity-100', 'pointer-events-auto');
    }
  }

  isLoggedIn(){

    return this.authService.isLoggedIn();
  }
}

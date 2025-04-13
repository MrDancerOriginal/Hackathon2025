import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  @ViewChild('openBtn') openBtn!: ElementRef;
  @Output() openMenu = new EventEmitter<void>(); 
  constructor(private authService: AuthService) {

  }

  isLoggedIn(){
    return this.authService.isLoggedIn;
  }
}

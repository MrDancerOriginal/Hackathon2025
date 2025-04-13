import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  /**
   *
   */
  constructor(private authService: AuthService) {
    console.log(this.isLoggedIn());
  }

  isLoggedIn(){

    return this.authService.isLoggedIn();
  }
}

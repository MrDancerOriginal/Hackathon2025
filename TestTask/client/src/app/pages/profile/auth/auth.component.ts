import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  constructor(private oauthService: OAuthService) {}

  ngOnInit(): void {
    this.oauthService.tryLogin().then(() => {
      window.location.href = '/'; // Перехід на головну сторінку після логіну
    });
  }
}

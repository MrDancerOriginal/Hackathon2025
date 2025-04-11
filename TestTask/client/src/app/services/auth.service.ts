import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private oauthService: OAuthService) {}

  getProtectedData() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.oauthService.getAccessToken()}`,
    });

    return this.http.get('https://your-backend-api-url/protected', { headers });
  }
}

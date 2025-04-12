import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { AuthResult } from '../models/auth-result';
import { UserLoginRequestDto } from '../models/user-login-request';
import { UserRegistrationRequestDto } from '../models/user-registration-request';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Base URL for the auth controller

  constructor(private http: HttpClient) { }

  register(userData: UserRegistrationRequestDto): Observable<AuthResult> {
    return this.http.post<AuthResult>(`${this.apiUrl}Auth/Register`, userData);
  }

  login(loginData: UserLoginRequestDto): Observable<AuthResult> {
    return this.http.post<AuthResult>(`${this.apiUrl}Auth/Login`, loginData);
  }

  // Store token in local storage
  storeToken(token: string, userId: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);
  }

  // Get token from local storage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Get user ID from local storage
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  }
}

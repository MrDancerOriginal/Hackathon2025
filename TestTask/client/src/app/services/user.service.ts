import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, throwError } from 'rxjs';
import { environment } from '../../environment/environment';
import { Shelter } from '../models/shelter.interface';
import { AuthService } from './auth.service';
import { Volunteer } from '../models/volunteer';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserInfo(): Observable<{ role: string, data: Shelter | Volunteer | null }> {
    const userId = this.authService.getUserId();
    if (!userId) {
      return throwError(() => new Error('User not logged in'));
    }

    return forkJoin([
      this.http.get<Shelter>(`${this.apiUrl}Shelters/byUserId/${userId}`).pipe(
        catchError(() => of(null)) // Повертаємо null у разі помилки
      ),
      this.http.get<Volunteer>(`${this.apiUrl}Volunteers/byUserId/${userId}`).pipe(
        catchError((err) => {
          console.log('Volunteer request error:', err);
          return of(null);
        })
      )
    ]).pipe(
      map(([shelter, volunteer]) => {
        if (shelter) {
          return { role: 'Shelter', data: shelter };
        } else if (volunteer) {
          return { role: 'Volunteer', data: volunteer };
        } else {
          return { role: 'Unknown', data: null };
        }
      })
    );
  }

  getCurrentUserRole(): Observable<string> {
    return this.getUserInfo().pipe(
      map(userInfo => userInfo.role),
      catchError(() => of('Unknown')) // Return 'Unknown' if there's an error
    );
  }

  isShelter(): Observable<boolean> {
    return this.getCurrentUserRole().pipe(
      map(role => role === 'Shelter')
    );
  }

  isVolunteer(): Observable<boolean> {
    return this.getCurrentUserRole().pipe(
      map(role => role === 'Volunteer')
    );
  }
}

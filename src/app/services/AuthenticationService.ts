// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ServiceSettings } from './ServiceSettings';
import { ResponseDto } from './ResponseDto';

interface LoginResponse {
  token: string; // adjust to your API response shape
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = ServiceSettings.AUTH_API; 
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(`${this.apiUrl}/api/auth/login`, { userName, password })
      .pipe(
        tap(response => {
          //this.setToken(response.result.token);
        })
      );
  }

//   logout(): void {
//     this.clearToken();
//   }

//   // === token helpers ===
//   setToken(token: string): void {
//     localStorage.setItem(this.tokenKey, token); // or sessionStorage
//   }

//   getToken(): string | null {
//     return localStorage.getItem(this.tokenKey);
//   }

//   clearToken(): void {
//     localStorage.removeItem(this.tokenKey);
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }
}

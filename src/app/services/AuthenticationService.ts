// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ServiceSettings } from './ServiceSettings';
import { ResponseDto } from './ResponseDto';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


export interface UserRecord {
    id : string;
    email: string;
    name : string;
    phoneNumber : string;
    role: string;
}

export interface UserToken {
    token: string;
}

export interface UserResponse {
    user : UserRecord;
    userToken: UserToken;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = ServiceSettings.AUTH_API; 
  private tokenKey = 'auth_token';
  private userKey = 'user_value';

  private userResponse : UserResponse | any = null;

  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<ResponseDto> {
    const response = this.http.post<ResponseDto>(`${this.apiUrl}/api/auth/login`, { userName, password })
      .pipe(
        tap(response => {
            this.userResponse = response.result;
            this.setToken(this.userResponse.token);
            this.setUser(this.userResponse.user);
            return response;
        }),
        catchError((error: HttpErrorResponse) => {
             console.error('Login error:', error);

        // you can rethrow the error so subscribers receive it
            return throwError(() => error);
        })
      );
      return response
  }

  register(email: string, user: string, phone: string, password: string, role: string) : Observable<ResponseDto> {
    return this.http.post<ResponseDto>(`${this.apiUrl}/api/auth/register`, { email, password })
      .pipe(
       tap((responseDto) => {
        if (!responseDto.isSuccess) {
          throw new Error(responseDto.message);
        }
      })
    );
  }
  

  logout(): void {
    this.clearToken();
  }

  // === token helpers ===
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token); // or sessionStorage
  }

  setUser(user: UserRecord) : void {
    localStorage.setItem(this.userKey, JSON.stringify(this.userResponse.user))
  }

  public getUser() : UserRecord | null {
    let userRecordString : string | any = localStorage.getItem(this.userKey);
    if (userRecordString !== null) {
      return JSON.parse(userRecordString);
    }
    return null;
  }

  public isUserLoggedIn() : boolean {
    return this.getUser() !== null;
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  public isAdmin() : boolean {
    return this.getUser() !== null && this.getUser()?.role == "ADMIN";
  }
}

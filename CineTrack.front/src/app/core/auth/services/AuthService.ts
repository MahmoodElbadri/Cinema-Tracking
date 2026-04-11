import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed, inject } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest } from '../models/login-request';
import { RegisterRequest } from '../models/register-request';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //variables
  private apiUrl = environment.apiUrl;
  token = signal<string | null>(localStorage.getItem('token'));
  isAuthenticated = computed(() => {
    return this.token() !== null;
  });
  userEmail = signal<string | null>(localStorage.getItem('userEmail'));

  //injections
  private http = inject(HttpClient);

  //methods
  // 'https://localhost:7136/api/identity/login
  login(loginModel: LoginRequest) {
    const url = `${this.apiUrl}/identity/login`;
    this.userEmail.set(loginModel.email);
    localStorage.setItem('userEmail', loginModel.email);
    return this.http.post<LoginResponse>(url, loginModel).pipe(
      tap((response: LoginResponse) => {
        this.token.set(response.accessToken);
        localStorage.setItem('token', response.accessToken);
      }),
    );
  }

  register(registerModel: RegisterRequest) {
    const url = `${this.apiUrl}/identity/register`;
    this.userEmail.set(registerModel.email);
    localStorage.setItem('userEmail', registerModel.email);
    return this.http.post<LoginResponse>(url, registerModel).pipe(
      tap((response: LoginResponse) => {
        this.token.set(response.accessToken);
        localStorage.setItem('token', response.accessToken);
      }),
    );
  }

  logout() {
    this.token.set(null);
    localStorage.removeItem('token');
    this.userEmail.set(null);
    localStorage.removeItem('userEmail');
  }
}

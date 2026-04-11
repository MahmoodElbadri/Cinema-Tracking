import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { RefreshTokenResponse } from '../models/refresh-token-response';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const http = inject(HttpClient);
  const apiUrl = environment.apiUrl;

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // 👇 تجاهل refresh request نفسه
      if (error.status === 401 && !req.url.includes('refresh-token')) {

        const refreshToken = localStorage.getItem('refreshToken');

        // 🤔 what happens if في refresh token؟
        if (refreshToken) {
          return http.post<RefreshTokenResponse>(`${apiUrl}/auth/refresh-token`, {
            refreshToken: refreshToken
          }).pipe(

            switchMap((res) => {
              // خزّن التوكن الجديد
              localStorage.setItem('token', res.accessToken);

              // كرر نفس request
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${res.accessToken}`
                }
              });

              return next(newReq);
            }),

            catchError(() => {
              // refresh فشل → logout
              localStorage.clear();
              router.navigate(['/login']);
              return throwError(() => error);
            })
          );
        }
      }

      // fallback
      return throwError(() => error);
    })
  );
};
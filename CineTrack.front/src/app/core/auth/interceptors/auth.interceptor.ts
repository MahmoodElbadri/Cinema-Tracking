import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { RefreshTokenResponse } from '../models/refresh-token-response';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const http = inject(HttpClient);
  const apiUrl = environment.apiUrl;

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      
      // 401 و مش refresh request نفسه
      if (error.status === 401 && !req.url.includes('refresh-token')) {
        
        // 🔄 لو فيه refresh شغال، استنى التوكن الجديد
        if (isRefreshing) {
          return refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap(newToken => {
              const newReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` }
              });
              return next(newReq);
            })
          );
        }

        // 🚀 ابدأ refresh جديد
        isRefreshing = true;
        refreshTokenSubject.next(null);

        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          logout(router);
          return throwError(() => error);
        }

        return http.post<RefreshTokenResponse>(`${apiUrl}/auth/refresh-token`, {
          refreshToken
        }).pipe(
          switchMap((res) => {
            localStorage.setItem('token', res.accessToken);
            if (res.refreshToken) {
              localStorage.setItem('refreshToken', res.refreshToken);
            }
            
            isRefreshing = false;
            refreshTokenSubject.next(res.accessToken);
            
            const newReq = req.clone({
              setHeaders: { Authorization: `Bearer ${res.accessToken}` }
            });
            return next(newReq);
          }),
          
          catchError(() => {
            isRefreshing = false;
            logout(router);
            return throwError(() => error);
          })
        );
      }

      return throwError(() => error);
    })
  );
};

function logout(router: Router) {
  localStorage.clear();
  router.navigate(['/login']);
}
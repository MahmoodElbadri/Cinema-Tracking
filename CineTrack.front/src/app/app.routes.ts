import { Routes } from '@angular/router';
import {authGuard} from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./features/movies/home-routing.module').then(
        (m) => m.HOME_ROUTES,
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth-routing.module').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'analytics',
    loadChildren: () =>
      import('./features/analytics/analytics-routing.module').then((m) => m.ANALYTICS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'movies',
  },
];

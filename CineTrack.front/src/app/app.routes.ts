import { Routes } from '@angular/router';

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
  },
  {
    path: '**',
    redirectTo: 'movies',
  },
];

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
    path: '**',
    redirectTo: 'movies',
  },
];

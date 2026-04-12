import { Route } from '@angular/router';

export const HOME_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    title: 'CineTrack - Home',
  },
  {
    path: 'watchlist',
    loadComponent: () =>
      import('./watchlist/watchlist.component').then(
        (m) => m.WatchlistComponent,
      ),
    title: 'CineTrack - Watchlist',
  },
  {
    path: 'movie-details/:id',
    loadComponent: () =>
      import('./movie-details/movie-details.component').then(
        (m) => m.MovieDetailsComponent,
      ),
    title: 'CineTrack - Movie Details',
  }
];

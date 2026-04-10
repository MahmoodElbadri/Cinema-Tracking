import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full'
    },
    {
        path: 'movies',
        loadChildren: () => import('./features/movies/home-routing.module')
        .then(m => m.HOME_ROUTES)
    },
];

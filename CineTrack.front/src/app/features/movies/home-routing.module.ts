import { Route } from "@angular/router";

export const HOME_ROUTES:Route[]=[
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
        title: 'CineTrack - Home'
    }
]
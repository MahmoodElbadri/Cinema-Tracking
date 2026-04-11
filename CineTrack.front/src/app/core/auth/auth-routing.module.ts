import { Routes } from "@angular/router";

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: ()=> import('./login/login.component').then(m => m.LoginComponent),
        title: 'Login'
    },
    {
        path: 'register',
        loadChildren: ()=> import('./register/register.component').then(m => m.RegisterComponent),
        title: 'Register'
    }
]
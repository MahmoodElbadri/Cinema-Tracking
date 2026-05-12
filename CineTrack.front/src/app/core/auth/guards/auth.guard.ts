import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/AuthService';
import {ToastrService} from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  let toaster = inject(ToastrService);
  if(!authService.isAuthenticated){
    return true;
  }
  else{
    router.navigate(['auth/login']);
    toaster.error("You have to login first")
    return false;
  }
};

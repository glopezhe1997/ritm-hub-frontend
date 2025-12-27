import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { RouterState } from '@ngrx/router-store';
import { AuthService } from '../../Auth/services/auth.service';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.hasRole('admin')) {
    return true;
  } else {
    router.navigate(['/forbidden']);
    return false;
  }
};

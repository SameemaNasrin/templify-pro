import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/auth.service';

import { inject } from '@angular/core';
import {
  Router
} from '@angular/router';
import { map, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    map((user) => {
      if (user && user.token) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
      }
    })
  );
};

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const token = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  if (route.data['role'] && route.data['role'] !== role) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

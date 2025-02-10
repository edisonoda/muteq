import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const loggedIn = localStorage.getItem('muteq-token') !== null;

  if (!loggedIn) {
    snackBar.open('Você deve estar autenticado para acessar essa página!', 'Fechar', { duration: 3000 });
    router.navigate(['']);
  }

  return loggedIn;
};

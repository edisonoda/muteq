import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const snackBar = inject(MatSnackBar);
  const loggedIn = localStorage.getItem('token') !== null;

  if (!loggedIn)
    snackBar.open('Você deve estar autenticado para acessar essa página!', 'Fechar', { duration: 3000 });

  return loggedIn;
};

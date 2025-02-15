import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  const token = localStorage.getItem('muteq-token');
  let headers = req.headers.set('X-Requested-With', 'XMLHttpRequest');

  const xhr = req.url.includes('login') ? req.clone({ headers: headers }) : req.clone({
    headers: headers
      .set('Authorization', `Bearer ${token}`)
  });

  return next(xhr).pipe(tap({
    error: error => {
      console.error("Ocorreu um erro na requisição: ", error);
      snackBar.open('Ocorreu um erro inesperado', 'Fechar', {
        duration: 3000
      });
    }
  }));
};

import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('muteq-token');
  let headers = req.headers.set('X-Requested-With', 'XMLHttpRequest');

  const xhr = req.url.includes('login') ? req.clone({ headers: headers }) : req.clone({
    headers: headers
      .set('Authorization', `Bearer ${token}`)
  });

  return next(xhr);
};

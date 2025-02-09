import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const xhr = req.clone({
    headers: req.headers
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('X-Auth-Token', 'XMLHttpRequest')
  });
  
  return next(xhr);
};

import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { tap } from 'rxjs';

const loaderRequests: Set<string> = new Set<string>();

export const LOADER = new HttpContextToken<string>(() => "Carregando");

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  const message = req.context.get(LOADER);

  if (message) {
    loaderService.request({ loading: true, url: req.urlWithParams, message: message });
    loaderRequests.add(req.urlWithParams);
  }

  return next(req).pipe(tap({
    complete: () => {
      loaderRequests.delete(req.urlWithParams);
      loaderService.request({ loading: false, url: req.urlWithParams });
    },
    error: () => {
      loaderRequests.delete(req.urlWithParams);
      loaderService.request({ loading: false, url: req.urlWithParams, error: true });
    },
    finalize: () => {
      if (!loaderRequests.size)
        loaderService.finish();
    }
  }));
};

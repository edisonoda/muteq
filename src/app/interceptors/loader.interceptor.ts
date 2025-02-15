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
    loaderService.change({ loading: true, message: message });
    loaderRequests.add(req.urlWithParams);
  }

  return next(req).pipe(tap({
    finalize: () => {
      loaderRequests.delete(req.urlWithParams);

      if (!loaderRequests.size)
        loaderService.change({ loading: false });
    }
  }));
};

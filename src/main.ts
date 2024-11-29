/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './app/interceptors/header.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routeConfig),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([
      headerInterceptor
    ])),
  ]
}).catch((err) => console.error(err));

/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, TitleStrategy } from '@angular/router';
import routeConfig, { BaseTitleStrategy } from './app/routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './app/interceptors/header.interceptor';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';

bootstrapApplication(AppComponent, {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routeConfig),
    { provide: TitleStrategy, useClass: BaseTitleStrategy },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
      ... new MatDialogConfig(),
      maxWidth: "80vw",
      maxHeight: "90vh",
      ariaModal: true
    }},
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([
      headerInterceptor
    ])),
  ]
}).catch((err) => console.error(err));

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
import { loaderInterceptor } from './app/interceptors/loader.interceptor';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';
import { provideShareButtonsOptions } from 'ngx-sharebuttons';
import { shareIcons } from 'ngx-sharebuttons/icons';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routeConfig),
    { provide: TitleStrategy, useClass: BaseTitleStrategy },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
        ... new MatDialogConfig(),
        maxWidth: "800px",
        maxHeight: "90vh",
        ariaModal: true
      }
    },
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `http://localhost:8080/image?name=${config.src}`;
      },
    },
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([
      headerInterceptor,
      loaderInterceptor
    ])),
    provideShareButtonsOptions(
      shareIcons()
    )
  ]
}).catch((err) => console.error(err));

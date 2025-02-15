import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, LoaderComponent],
  template: `
    <dialog *ngIf="loading" class="main-loader">
      <div class="loader-container">
        <app-loader [animated]="false" [size]="60"></app-loader>
        <p>{{loadingMessage}}</p>
      </div>
    </dialog>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  private _loading: boolean = false;
  public get loading() { return this._loading; }

  private _loadingMessage: string = "Carregando";
  public get loadingMessage() { return this._loadingMessage; }

  private _sub: Subscription;

  constructor(private loaderService: LoaderService) {
    this._sub = this.loaderService.changed$.subscribe(res => {
      this._loading = res.loading;
      this._loadingMessage = res.message ?? "Carregando";
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}

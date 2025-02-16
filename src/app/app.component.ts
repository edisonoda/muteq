import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { LoaderComponent } from './shared/loader/loader.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface LoaderRequestItem {
  msg: string;
  finished: boolean;
  error?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    LoaderComponent,
    KeyValuePipe,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private _loading: boolean = false;
  public get loading() { return this._loading; }

  private _loaderRequests: Map<string, LoaderRequestItem> = new Map<string, LoaderRequestItem>();
  public get loaderRequests() { return this._loaderRequests; }

  private _subs: Array<Subscription> = [];

  constructor(private loaderService: LoaderService) {
    this._subs.push(
      this.loaderService.requested$.subscribe(res => {
        let req: LoaderRequestItem = { msg: "Finalizado", finished: true };

        if (res.error) {
          req = { msg: "Erro", finished: true, error: true };
        } else if (res.loading) {
          req = { msg: res.message ?? "Fazendo requisição", finished: false };
          this._loading = true;
        }

        this._loaderRequests.set(res.url, req);
  
        // TODO: temporário
        let finished = true;
        this._loaderRequests.forEach(req => {
          if (!req.finished)
            finished = false;
        });
  
        if (finished) {
          this._loaderRequests.clear();
          this.loaderService.finish();
        }
      }),
      this.loaderService.finished$.subscribe(() => {
        this._loading = false;
      })
    );
  }

  ngOnDestroy(): void {
    this._subs.forEach(sub => sub.unsubscribe());
  }
}

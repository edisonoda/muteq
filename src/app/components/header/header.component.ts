import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MenuComponent, SearchComponent, RouterModule],
  template: `
    <header>
      <div class="header-content">
        <a class="logo" routerLink="/" aria-label="Página inicial">
          <img class="logos__mutec" src="assets/img/mutec_logo.png">
        </a>
        <div class="actions">
          @if (!loggedIn) {
            <button mat-icon-button (click)="login()" style="color: var(--mat-sys-primary)">
              <mat-icon>login</mat-icon>
            </button>
          } @else {
            <button mat-icon-button (click)="logout()" style="color: var(--mat-sys-error)">
              <mat-icon>logout</mat-icon>
            </button>
          }
          <app-menu [loggedIn]="loggedIn"></app-menu>
        </div>
        <app-search></app-search>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  private _loggedIn: boolean;
  public get loggedIn() { return this._loggedIn }

  private _authSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this._loggedIn = localStorage.getItem('token') !== null;
    this._authSub = this.authService.authChanged$.subscribe(() => {
      this._loggedIn = localStorage.getItem('token') !== null;
    });
  }

  public login(): void {
    this.router.navigate(['login']);
  }

  public logout(): void {
    this.authService.logout().subscribe(res => {
      if (res.status == 200 && res.data)
        location.reload();
    });
  }

  ngOnDestroy(): void {
    this._authSub.unsubscribe();
  }
}
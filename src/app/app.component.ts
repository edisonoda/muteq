import { Component, OnDestroy } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { QRCodeReaderButtonComponent } from "./components/qrcode-reader/qrcode-reader-button.component";
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterOutlet, QRCodeReaderButtonComponent],
  template: `
    <app-header></app-header>
    <main>
      <section [ngClass]="{'content': !isHome}">
        <router-outlet></router-outlet>
        <app-qrcode-reader-button></app-qrcode-reader-button>
        <!-- <app-home></app-home> -->
      </section>
    </main>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  title = 'default';
  public isHome: boolean = false;
  private _sub: Subscription;

  constructor(private router: Router) {
    this._sub = this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd)
        this.isHome = ev.url === "/";
    })
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}

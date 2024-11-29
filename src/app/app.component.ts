import {Component} from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { QRCodeReaderButtonComponent } from "./components/qrcode-reader/qrcode-reader-button.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, QRCodeReaderButtonComponent],
  template: `
    <app-header></app-header>
    <main>
      <section class="content">
        <router-outlet></router-outlet>
        <app-qrcode-reader-button></app-qrcode-reader-button>
        <!-- <app-home></app-home> -->
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'default';
}

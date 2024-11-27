import {Component} from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { RouterOutlet } from '@angular/router';
import { QRCodeReaderComponent } from "./qrcode-reader/qrcode-reader.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, QRCodeReaderComponent],
  template: `
    <app-header></app-header>
    <main>
      <section class="content">
        <router-outlet></router-outlet>
        <app-qrcode-reader></app-qrcode-reader>
        <!-- <app-home></app-home> -->
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'default';
}

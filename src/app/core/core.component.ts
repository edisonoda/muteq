import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { QRCodeReaderButtonComponent } from '../components/qrcode-reader/qrcode-reader-button.component';

@Component({
  selector: 'app-core',
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterOutlet, QRCodeReaderButtonComponent],
  template: `
    <app-header></app-header>
    <main>
      <section class="content">
        <router-outlet></router-outlet>
        <app-qrcode-reader-button></app-qrcode-reader-button>
      </section>
    </main>
    <app-footer></app-footer>
  `,
  styleUrls: ['./core.component.css'],
})
export class CoreComponent { }

import { afterNextRender, Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { QRCodeReaderButtonComponent } from '../shared/qrcode-reader/qrcode-reader-button.component';
import { incrementAnimation } from '../utils/animations/route.animation';

@Component({
  selector: 'app-core',
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterOutlet, QRCodeReaderButtonComponent],
  template: `
    <app-header></app-header>
    <main>
      <section class="content">
        <div [@incrementAnimation]="animationState" [@.disabled]="animationDisable()">
          <router-outlet (activate)="onActivate()"></router-outlet>
        </div>
        <app-qrcode-reader-button></app-qrcode-reader-button>
      </section>
    </main>
    <app-footer></app-footer>
  `,
  styleUrls: ['./core.component.css'],
  animations: [incrementAnimation],
})
export class CoreComponent {
  public animationDisable: WritableSignal<boolean> = signal(true);

  private _animationState: number = 0;
  public get animationState() { return this._animationState; }

  constructor(public route: ActivatedRoute) {
    afterNextRender(() => {
      if (this.animationDisable())
        this.animationDisable.set(false);
    });
  }

  onActivate() {
    console.log(this.route);
    this._animationState = this.route.firstChild?.snapshot.data['routeIdx'] ?? 0;
    console.log(this._animationState);
  }
}

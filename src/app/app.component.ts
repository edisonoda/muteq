import {Component} from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <app-header></app-header>
    <main>
      <section class="content">
        <router-outlet></router-outlet>
        <!-- <app-home></app-home> -->
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'default';
}

import { Component } from '@angular/core';
import { Menu } from './menu';  
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [Menu, RouterModule],
  template: `
    <header>
      <div class="header-content">
        <div class="logos">
          <a routerLink="/"><img class="logos__mutec" src="assets/img/mutec_logo.png"></a>
        </div>
        <div>
          <menu></menu>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

}
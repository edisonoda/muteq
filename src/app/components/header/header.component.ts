import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-header',
  imports: [MenuComponent, SearchComponent, RouterModule],
  template: `
    <header>
      <div class="header-content">
        <div class="logos">
          <a routerLink="/"><img class="logos__mutec" src="assets/img/mutec_logo.png"></a>
        </div>
        <app-search></app-search>
        <app-menu></app-menu>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

}
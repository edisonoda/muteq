import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header>
      <div class="header-content">
        <div class="logos">
          <img class="logos__mutec" src="assets/img/mutec_logo.png">
          <img class="logos__utfpr" src="assets/img/utfpr.png" >
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header>
      <div>
        <img src="assets/img/mutec_logo.png" style="padding-bottom: 13px;">
        <img src="assets/img/utfpr.png" >
      </div>
    </header>
  `,
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

}

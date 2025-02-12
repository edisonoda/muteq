import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent { }

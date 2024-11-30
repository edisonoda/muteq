import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

/**
 * @title Menu with icons
 */
@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  imports: [MatButtonModule, MatMenuModule, MatIconModule, RouterModule],
})
export class MenuComponent { }
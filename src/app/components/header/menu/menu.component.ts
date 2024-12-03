import { Component, Input } from '@angular/core';
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
export class MenuComponent {
  private _loggedIn: boolean = false;
  public get loggedIn() { return this._loggedIn }
  @Input()
  public set loggedIn(l: boolean) { this._loggedIn = l }
}
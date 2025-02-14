import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Listable } from 'src/app/interfaces/listable';

@Component({
  selector: 'app-list-element',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.css'],
})
export class ListElementComponent {
  private _element: Listable = { id: -1, name: "", description: "" };
  public get element() { return this._element; }
  @Input()
  public set element(e: Listable) { this._element = e; }

  constructor() { }
}

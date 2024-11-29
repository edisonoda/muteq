import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Listable } from 'src/app/interfaces/listable';

@Component({
  selector: 'app-list-element',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './list-element.component.html',
  styleUrls: ['../list.component.css'],
})
export class ListElementComponent {
  @Input()
  public element: Listable = { id: -1, name: "", description: "" };

  @ViewChild('title', { static: false }) title!: ElementRef;

  public titleHeight: number = 100;

  constructor() {

  }
}

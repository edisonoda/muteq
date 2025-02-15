import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { expandAnimation } from 'src/app/utils/animations/expand.animation';

@Component({
  selector: 'app-loader',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  animations: [expandAnimation]
})
export class LoaderComponent {
  private _loading: boolean = true;
  public get loading() { return this._loading; }
  @Input()
  public set loading(l: boolean) { this._loading = l; }
  
  private _template!: TemplateRef<any>;
  public get template() { return this._template; }
  @Input()
  public set template(t: TemplateRef<any>) { this._template = t; }

  constructor() { }
}

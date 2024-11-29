import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private _title: String = "MUTEC";
  public get title() {
    return this._title;
  }

  private _img: String = "";
  public get img() {
    return this._img;
  }

  private _description: String = "O Museu de Tecnologias do Campus Curitiba da UTFPR";
  public get description() {
    return this._description;
  }

  constructor() {
    
  }
}

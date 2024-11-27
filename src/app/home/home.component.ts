import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private title: String = "Bem-vinda(o) ao MUTEQ!";
  private img: String = "";
  private description: String = "Tenha todos os itens do museu em suas mãos.";

  constructor() {
    
  }

  public getTitle(): String {
    return this.title;
  }

  public getImg(): String {
    return this.img;
  }

  public getDescription(): String {
    return this.description;
  }
}

import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { FooterComponent } from 'src/app/core/footer/footer.component';
import { HomeTitleComponent } from './home-title/home-title.component';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent, HeaderComponent, FooterComponent, HomeTitleComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private _title: string = "MUTEC";
  public get title() {
    return this._title;
  }

  private _img: string = "";
  public get img() {
    return this._img;
  }

  private _description: string = "O Museu de Tecnologias do Campus Curitiba da UTFPR";
  public get description() {
    return this._description;
  }

  constructor(private homeService: HomeService) {
    
  }

  public onScroll(ev: Event): void {
    this.homeService.scroll(ev);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { FooterComponent } from 'src/app/core/footer/footer.component';
import { HomeTitleComponent } from './home-title/home-title.component';
import { HomeService } from 'src/app/services/home.service';
import { SearchService } from 'src/app/services/search.service';
import { Item } from 'src/app/interfaces/item';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from '../item/item.component';
import { QRCodeReaderButtonComponent } from '../qrcode-reader/qrcode-reader-button.component';
import { ListElementComponent } from '../lists/list-element/list-element.component';

@Component({
  selector: 'app-home',
  imports: [
    CarouselComponent,
    ListElementComponent,
    HeaderComponent,
    FooterComponent,
    HomeTitleComponent,
    QRCodeReaderButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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

  private _elements: Array<Item> = [];
  public get elements() { return this._elements; }

  private readonly _dialog = inject(MatDialog);

  constructor(private homeService: HomeService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.getHomeItems();
  }

  private getHomeItems(): void {
    this.searchService.getHomeItems().subscribe(res => {
      if (res)
        this._elements = res.elements;
    });
  }

  public onScroll(ev: Event): void {
    this.homeService.scroll(ev);
  }
  
  public previewItem(id: number): void {
    const dialogRef = this._dialog.open(ItemComponent, {
      data: id
    });
  }
}

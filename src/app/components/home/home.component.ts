import { Component, inject } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { FooterComponent } from 'src/app/core/footer/footer.component';
import { HomeTitleComponent } from './home-title/home-title.component';
import { HomeService } from 'src/app/services/home.service';
import { PaginatedList, SearchService } from 'src/app/services/search.service';
import { Observable } from 'rxjs';
import { Item } from 'src/app/interfaces/item';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from '../item/item.component';

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

  private _homeItemsRequest!: Observable<PaginatedList<Item>>;
  public get homeItemsRequest() { return this._homeItemsRequest; }

  private readonly _dialog = inject(MatDialog);

  constructor(private homeService: HomeService, private searchService: SearchService) {
    this._homeItemsRequest = this.searchService.getHomeItems();
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

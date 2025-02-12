import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../lists/list.component';
import { Item } from 'src/app/interfaces/item';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from '../item/item.component';
import { ListElementComponent } from '../lists/list-element/list-element.component';

export interface CarouselResponsivity {
  slideCount: number;
  minWidth: number;
}

export interface CarouselSettings {
  responsivity: Array<CarouselResponsivity>;
  slideCount: number;
  pagination: boolean;
  navigation: boolean;
}

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, ListElementComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css', '../lists/list.component.css'],
})
export class CarouselComponent extends ListComponent<Item> {
  private readonly _dialog = inject(MatDialog);

  private readonly carouselSettings: CarouselSettings = {
    navigation: true,
    pagination: true,
    slideCount: 1,
    responsivity: [
      {
        slideCount: 3,
        minWidth: 576
      },
      {
        slideCount: 5,
        minWidth: 992
      }
    ]
  };

  constructor() {
    super();
  }

  protected override getList(): void {
    this.searchService.getItems(this.page, this.sampleSize).subscribe(res => {
      if (res) {
        this.elements = res.elements;
        this.count = res.count;
      }
    });
  }

  public previewItem(id: number): void {
    const dialogRef = this._dialog.open(ItemComponent, {
      data: id
    });
  }
}

import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../lists/list.component';
import { Item } from 'src/app/interfaces/item';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from '../item/item.component';


@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent extends ListComponent<Item> {
  private readonly _dialog = inject(MatDialog);

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

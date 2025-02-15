import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Item } from 'src/app/interfaces/item';
import { SearchService } from 'src/app/services/search.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-item',
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit {
  private _item: Item = { id: -1, description: "", manufacturer: "", name: "", year: -1 };
  public get item() { return this._item; }
  public set item(i: Item) { this._item = i; }

  private _selected: number = 0;
  public get selected() { return this._selected; }

  private readonly _dialogRef = inject(MatDialogRef<ItemComponent>);
  private readonly _data = inject<number>(MAT_DIALOG_DATA);

  constructor(private cdr: ChangeDetectorRef, private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.getItem(this._data).subscribe(res => {
      if (res) {
        this.item = res;
        this.cdr.detectChanges();
      }
    });
  }

  public previewImage(i: number): void {
    this._selected = i;
    this.cdr.detectChanges();
  }

  close(): void {
    this._dialogRef.close();
  }
}

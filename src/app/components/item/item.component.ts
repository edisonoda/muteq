import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Item } from 'src/app/interfaces/item';
import { SearchService } from 'src/app/services/search.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QRCodeReaderComponent } from 'src/app/shared/qrcode-reader/qrcode-reader.component';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';
import { ShareComponent } from 'src/app/shared/share/share.component';

@Component({
  selector: 'app-item',
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    LoaderComponent,
    ShareComponent,
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

  private _loading: boolean = true;
  public get loading() { return this._loading; }

  private readonly _dialogRef = inject(MatDialogRef<ItemComponent>);
  private readonly _dialog = inject(MatDialog);
  
  private readonly _data = inject<number>(MAT_DIALOG_DATA);

  constructor(private cdr: ChangeDetectorRef, private searchService: SearchService) { }

  ngOnInit(): void {
    this._loading = true;
    this.searchService.getItem(this._data).subscribe({
      next: res => {
        this._loading = false;

        if (res) {
          this.item = res;
          this.cdr.detectChanges();
        }
      },
      error: () => this._loading = false
    });
  }

  public previewImage(i: number): void {
    this._selected = i;
    this.cdr.detectChanges();
  }
  
  public scanQRCode(): void {
    const dialogRef = this._dialog.open(QRCodeReaderComponent, {
      maxHeight: 'unset',
      maxWidth: 'unset',
    });

    this.close();
  }

  close(): void {
    this._dialogRef.close();
  }
}

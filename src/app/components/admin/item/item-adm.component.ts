import { AfterViewInit, Component, inject, SecurityContext, ViewChild } from '@angular/core';
import { ListComponent } from '../../lists/list.component';
import { Item } from 'src/app/interfaces/item';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QRCodeComponent } from 'angularx-qrcode';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { AdmService } from 'src/app/services/adm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginatorComponent } from '../../lists/paginator/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-item-adm',
  imports: [
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    QRCodeComponent,
    PaginatorComponent,
    NgOptimizedImage,
  ],
  templateUrl: './item-adm.component.html',
  styleUrls: ['../list.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*', padding: 'var(--content-padding) 0'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ItemAdmComponent extends ListComponent<Item> implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<Item>;
  @ViewChild(PaginatorComponent) paginator!: PaginatorComponent;
  
  private _dataSource: MatTableDataSource<Item> = new MatTableDataSource();
  public get dataSource() { return this._dataSource; }

  private _columnsToDisplay: Array<string> = ['id', 'name', 'manufacturer', 'year', 'section', 'category'];
  public get columnsToDisplay() { return this._columnsToDisplay }

  private _columnsToDisplayWithActions: Array<string> = [ 'expand', ...this.columnsToDisplay, 'actions' ];
  public get columnsToDisplayWithActions() { return this._columnsToDisplayWithActions }

  private _expandedElement: Item | null = null;
  public get expandedElement() { return this._expandedElement }
  public set expandedElement(e: Item | null) { this._expandedElement = e; }

  // QRCode string
  private _qrCode: { name: string, url: string } = { name: '', url: '' };
  public get qrCode() { return this._qrCode }
  public set qrCode(q: { name: string, url: string }) { this._qrCode = q }

  private readonly _dialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);

  constructor(
    private admService: AdmService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator.paginator;
  }

  protected override getList(): void {
    this.dataSource.data = [];

    this.searchService.getItems(this.page, this.sampleSize, true).subscribe(res => {
      if (res) {
        this.elements = res.elements;
        this.dataSource.data = this.elements;
        this.count = res.count;
      }

      this.table?.renderRows();
    });
  }

  public sortData(sort: Sort): void {
    const data = this.elements.slice();

    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'manufacturer':
          return compare(a.manufacturer, b.manufacturer, isAsc);
        case 'year':
          return compare(a.year, b.year, isAsc);
        case 'section':
          return compare(a.section?.name ?? '', b.section?.name ?? '', isAsc);
        case 'category':
          return compare(a.category?.name ?? '', b.category?.name ?? '', isAsc);
        default:
          return 0;
      }
    });

    this.dataSource.paginator?.firstPage();
  }

  public search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.dataSource.paginator?.firstPage();
  }

  public override pageChanged(ev: PageEvent): void {
    if (ev.pageIndex != this.page)
      this.page = ev.pageIndex;

    if (ev.pageSize != this.sampleSize)
      this.sampleSize = ev.pageSize;

    setTimeout(() => window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  public generateQRCode(item: Item): void {
    this.qrCode = { name: item.name, url: String(item.id) };
  }

  public onChangeQRCode(url: SafeUrl): void {
    if (!this.qrCode.url)
      return;

    const date = new Date();
    const link = this.sanitizer.sanitize(SecurityContext.URL, url) ?? '';
    const a = document.createElement('a');
    a.href = link;
    a.target = "_blank";
    a.download = `(QRCode) ${this.qrCode.name ?? ''} (${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()})`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  public createItem(): void {
    this.router.navigate(['adm', 'item']);
  }

  public editItem(id: number): void {
    this.router.navigate(['adm', 'item', id]);
  }

  public deleteItem(id: number): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm)
        this.admService.deleteItem(id).subscribe(res => {
          if (res)
            this._snackBar.open('Item excluído com sucesso', 'Fechar', {
              duration: 3000
            });
          else
            this._snackBar.open('Ocorreu um erro ao excluir item', 'Fechar', {
              duration: 3000
            });
        });
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
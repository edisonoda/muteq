import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { ListComponent } from '../../lists/list.component';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { AdmService } from 'src/app/services/adm.service';
import { Category } from 'src/app/interfaces/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginatorComponent } from '../../lists/paginator/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-category-adm',
  imports: [
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    PaginatorComponent
  ],
  templateUrl: './category-adm.component.html',
  styleUrls: ['../list.css'],
})
export class CategoryAdmComponent extends ListComponent<Category> implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<Category>;
  @ViewChild(PaginatorComponent) paginator!: PaginatorComponent;

  private _dataSource: MatTableDataSource<Category> = new MatTableDataSource();
  public get dataSource() { return this._dataSource; }

  private _columnsToDisplay: Array<string> = ['id', 'name', 'items'];
  public get columnsToDisplay() { return this._columnsToDisplay }

  private _columnsToDisplayWithActions: Array<string> = [ ...this.columnsToDisplay, 'actions' ];
  public get columnsToDisplayWithActions() { return this._columnsToDisplayWithActions }

  private readonly _dialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);

  constructor(private admService: AdmService) {
    super();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator.paginator;
  }

  protected override getList(): void {
    this.dataSource.data = [];

    this.searchService.getCategories(this.page, this.sampleSize).subscribe(res => {
      if (res.status == 200 && res.data) {
        this.elements = res.data.elements;
        this.dataSource.data = this.elements;
        this.count = res.data.count;
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
        case 'items':
          return compare(a.items.length, b.items.length, isAsc);
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

  public createCategory(): void {
    this.router.navigate(['adm', 'category']);
  }

  public editCategory(id: number): void {
    this.router.navigate(['adm', 'category', id]);
  }

  public deleteCategory(id: number): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm)
        this.admService.deleteCategory(id).subscribe(res => {
          if (res.status == 200 && res.data)
            this._snackBar.open('Categoria excluída com sucesso', 'Fechar', {
              duration: 3000
            });
          else
            this._snackBar.open('Ocorreu um erro ao excluir categoria', 'Fechar', {
              duration: 3000
            });
        });
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
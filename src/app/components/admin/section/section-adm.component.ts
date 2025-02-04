import { Component, inject, Inject, ViewChild } from '@angular/core';
import { ListComponent } from '../../lists/list.component';
import { SearchService } from 'src/app/services/search.service';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { AdmService } from 'src/app/services/adm.service';
import { Section } from 'src/app/interfaces/section';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-section-adm',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule
  ],
  templateUrl: './section-adm.component.html',
  styleUrls: ['../list.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*', padding: 'var(--content-padding) 0'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SectionAdmComponent extends ListComponent<Section> {
  @ViewChild(MatTable) table!: MatTable<Section>;

  private _sortedData: Array<Section> = [];
  public get sortedData() { return this._sortedData; }
  public set sortedData(i: Array<Section>) { this._sortedData = i; }

  private _columnsToDisplay: Array<string> = ['id', 'name', 'items'];
  public get columnsToDisplay() { return this._columnsToDisplay }

  private _columnsToDisplayWithActions: Array<string> = [ ...this.columnsToDisplay, 'actions' ];
  public get columnsToDisplayWithActions() { return this._columnsToDisplayWithActions }

  private _expandedElement: Section | null = null;
  public get expandedElement() { return this._expandedElement }
  public set expandedElement(e: Section | null) { this._expandedElement = e; }

  private readonly _dialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);

  constructor(
    @Inject(SearchService) searchService: SearchService,
    private admService: AdmService,
    private router: Router
  ) {
    super(searchService);
  }

  protected override getList(): void {
    this.sortedData = [];

    this.searchService.getSections(this.page, this.sampleSize).subscribe(res => {
      if (res.status == 200) {
        this.elements = res.data ?? [];
        this.sortedData = this.elements;
      }

      this.table.renderRows();
    });
  }

  public sortData(sort: Sort): void {
    const data = this.elements.slice();

    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
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
  }

  public createSection(): void {
    this.router.navigate(['adm', 'section']);
  }

  public editSection(id: number): void {
    this.router.navigate(['adm', 'section', id]);
  }

  public deleteSection(id: number): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm)
        this.admService.deleteSection(id).subscribe(res => {
          if (res.status == 200 && res.data)
            this._snackBar.open('Seção excluída com sucesso', 'Fechar', {
              duration: 3000
            });
          else
            this._snackBar.open('Ocorreu um erro ao excluir seção', 'Fechar', {
              duration: 3000
            });
        });
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
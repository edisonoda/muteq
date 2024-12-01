import { Component, Inject, ViewChild } from '@angular/core';
import { ListComponent } from '../../lists/list.component';
import { Item } from 'src/app/interfaces/item';
import { SearchService } from 'src/app/services/search.service';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-adm',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './item-adm.component.html',
  styleUrls: ['./item-adm.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*', padding: 'var(--content-padding) 0'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ItemAdmComponent extends ListComponent<Item> {
  @ViewChild(MatTable) table!: MatTable<Item>;

  private _sortedData: Array<Item> = [];
  public get sortedData() { return this._sortedData; }
  public set sortedData(i: Array<Item>) { this._sortedData = i; }

  private _columnsToDisplay: Array<string> = ['id', 'name', 'manufacturer', 'year', 'section', 'category'];
  public get columnsToDisplay() { return this._columnsToDisplay }

  private _columnsToDisplayWithActions: Array<string> = [ ...this.columnsToDisplay, 'actions' ];
  public get columnsToDisplayWithActions() { return this._columnsToDisplayWithActions }

  private _expandedElement: Item | null = null;
  public get expandedElement() { return this._expandedElement }
  public set expandedElement(e: Item | null) { this._expandedElement = e; }

  constructor(@Inject(SearchService) searchService: SearchService) {
    super(searchService);
  }

  public override getList(): void {
    this.sortedData = [];

    this.searchService.getItems(this.page, this.sampleSize).subscribe(res => {
      if (res.status == 200) {
        this.elements = res.data ?? [];
        this.sortedData = this.elements;
      }

      this.table.renderRows();
    });
  }

  sortData(sort: Sort) {
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
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
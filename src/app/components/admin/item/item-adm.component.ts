import { Component, Inject, ViewChild } from '@angular/core';
import { ListComponent } from '../../lists/list.component';
import { Item } from 'src/app/interfaces/item';
import { SearchService } from 'src/app/services/search.service';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
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

  private _columnsToDisplay: Array<string> = ['id', 'name', 'manufacturer', 'year', 'section', 'category'];
  public get columnsToDisplay() { return this._columnsToDisplay }

  private _columnsToDisplayWithExpand: Array<string> = [ ...this.columnsToDisplay, 'expand' ];
  public get columnsToDisplayWithExpand() { return this._columnsToDisplayWithExpand }

  private _expandedElement: Item | null = null;
  public get expandedElement() { return this._expandedElement }
  public set expandedElement(e: Item | null) { this._expandedElement = e; }

  constructor(@Inject(SearchService) searchService: SearchService) {
    super(searchService);
  }

  public override getList(): void {
    this.searchService.getItems(this.page, this.sampleSize).subscribe(res => {
      if (res.status == 200)
        this.elements = res.data ?? [];

      this.table.renderRows();
    });
  }
}

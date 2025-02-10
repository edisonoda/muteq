import { Component, inject, OnDestroy } from '@angular/core';
import { ListComponent } from './list.component';
import { Item } from 'src/app/interfaces/item';
import { CommonModule } from '@angular/common';
import { ListElementComponent } from './list-element/list-element.component';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from '../item/item.component';
import { Params } from '@angular/router';
import { PaginatorComponent } from './paginator/paginator';

enum ItemGroup {
  NONE,
  SECTION,
  CATEGORY
}

interface ListFilters {
  type: ItemGroup;
  group: number;
}

@Component({
  selector: 'app-items',
  imports: [CommonModule, ListElementComponent, PaginatorComponent],
  templateUrl: './item-list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ItemListComponent extends ListComponent<Item> {
  private _filters: ListFilters = { type: ItemGroup.NONE, group: -1 };
  public get filters() { return this._filters; }
  public set filters(f: ListFilters) { this._filters = f; }

  private _title: string = 'Itens';
  public get title() { return this._title; }
  public set title(t: string) { this._title = t; }

  private readonly _dialog = inject(MatDialog);

  constructor() {
    super();

    this._subs.push(
      // Verifica se possui algum filtro (por categoria ou seção)
      this.route.queryParams.subscribe(params => {
        this.changeFilters(params);
      })
    );
  }

  protected override getList(): void {
    switch (this.filters.type) {
      case ItemGroup.NONE:
        this.searchService.getItems(this.page, this.sampleSize).subscribe(res => {
          if (res) {
            this.elements = res.elements;
            this.count = res.count;
          }

          this.title = 'Itens';
        });
        break;
      case ItemGroup.SECTION:
        this.searchService.getItemsBySection(this.filters.group, this.page, this.sampleSize).subscribe(res => {
          if (res) {
            this.elements = res.items ?? [];
            this.title = res.section + ' / Itens';
          }
        });
        break;
      case ItemGroup.CATEGORY:
        this.searchService.getItemsByCategory(this.filters.group, this.page, this.sampleSize).subscribe(res => {
          if (res) {
            this.elements = res.items ?? [];
            this.title = res.category + ' / Itens';
          }
        });
        break;
    }
  }

  private changeFilters(params: Params): void {
    const paramArray = Object.entries(params);

    if (paramArray.length == 0) {
      this.filters.type = ItemGroup.NONE;
      this.filters.group = -1;
      return;
    }

    // Aplica apenas o primeiro filtro
    paramArray.find(([k, v]) => {
      switch (k) {
        case 'category':
          this.filters.type = ItemGroup.CATEGORY;
          this.filters.group = v;
          return true;
        case 'section':
          this.filters.type = ItemGroup.SECTION;
          this.filters.group = v;
          return true;
        default:
          this.filters.type = ItemGroup.NONE;
          this.filters.group = -1;
          return false;
      }
    });
  }

  public previewItem(id: number): void {
    const dialogRef = this._dialog.open(ItemComponent, {
      data: id
    });
  }
}

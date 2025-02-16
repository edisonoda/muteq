import { Component, inject } from '@angular/core';
import { ListComponent } from '../list.component';
import { Item } from 'src/app/interfaces/item';
import { CommonModule } from '@angular/common';
import { ListElementComponent } from '../list-element/list-element.component';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from '../../item/item.component';
import { Params, RouterModule } from '@angular/router';
import { PaginatorComponent } from '../paginator/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';
import { listLoadAnimation } from 'src/app/utils/animations/list-load.animation';

enum ItemGroup {
  NONE,
  SECTION,
  CATEGORY
}

interface ListFilters {
  type: ItemGroup;
  group: number;
}

interface BreadcrumbSlice {
  routerLink: string;
  title: string;
}

@Component({
  selector: 'app-items',
  imports: [CommonModule, ListElementComponent, PaginatorComponent, RouterModule, MatChipsModule, LoaderComponent],
  templateUrl: './item-list.component.html',
  styleUrls: ['../list.component.css'],
  animations: [listLoadAnimation]
})
export class ItemListComponent extends ListComponent<Item> {
  private _filters: ListFilters = { type: ItemGroup.NONE, group: -1 };
  public get filters() { return this._filters; }
  public set filters(f: ListFilters) { this._filters = f; }

  private _title: string = '';
  public get title() { return this._title; }
  public set title(t: string) { this._title = t; }

  private _breadcrumb: Array<BreadcrumbSlice> = [];
  public get breadcrumb() { return this._breadcrumb; }
  public set breadcrumb(t: Array<BreadcrumbSlice>) { this._breadcrumb = t; }

  private _loading: boolean = true;
  public get loading() { return this._loading; }

  private _initialized: boolean = false;
  private readonly _dialog = inject(MatDialog);

  constructor() {
    super();

    this._subs.push(
      // Verifica se possui algum filtro (por categoria ou seção)
      this.route.queryParams.subscribe(params => {
        this.changeFilters(params);
        this.getList();
      })
    );
  }

  protected override getList(): void {
    if (!this._initialized) {
      this._initialized = true;
      return;
    }

    this._loading = true;
    switch (this.filters.type) {
      case ItemGroup.NONE:
        this.breadcrumb = [];
        this.title = "Itens";
        
        this.searchService.getItems(this.page, this.sampleSize).subscribe({
          next: res => {
            this._loading = false;

            if (res) {
              this.elements = res.elements;
              this.count = res.count;
            }
          },
          error: () => this._loading = false
        });
        break;
      case ItemGroup.SECTION:
        this.searchService.getItemsBySection(this.filters.group, this.page, this.sampleSize).subscribe({
          next: res => {
            this._loading = false;

            if (res) {
              this.elements = res.items ?? [];
              this.breadcrumb = [{ routerLink: "/sections", title: "Seções" }];
              this.title = res.section;
            }
          },
          error: () => this._loading = false
        });
        break;
      case ItemGroup.CATEGORY:
        this.searchService.getItemsByCategory(this.filters.group, this.page, this.sampleSize).subscribe({
          next: res => {
            this._loading = false;

            if (res) {
              this.elements = res.items ?? [];
              this.breadcrumb = [{ routerLink: "/categories", title: "Categorias" }];
              this.title = res.category;
            }
          },
          error: () => this._loading = false
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

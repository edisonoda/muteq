import { Component, inject, Inject, OnDestroy } from '@angular/core';
import { ListComponent } from './list.component';
import { Item } from 'src/app/interfaces/item';
import { SearchService } from 'src/app/services/search.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ListElementComponent } from './list-element/list-element.component';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from '../item/item.component';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  imports: [CommonModule, MatCardModule, MatButtonModule, ListElementComponent],
  templateUrl: './item-list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ItemListComponent extends ListComponent<Item> implements OnDestroy {
  private _filters: ListFilters = { type: ItemGroup.NONE, group: -1 };
  public get filters() { return this._filters; }
  public set filters(f: ListFilters) { this._filters = f; }

  private readonly _dialog = inject(MatDialog);
  private _subs: Array<Subscription> = [];

  constructor(
    @Inject(SearchService) searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(searchService);

    this._subs.push(
      // Verifica se possui algum filtro (por categoria ou seção)
      this.route.queryParams.subscribe(params => {
        this.changeFilters(params);
      }),
      // Verifica se alterou os filtros, pois não altera instancia um novo ao mudar de rota
      this.router.events.subscribe(ev => {
        if (ev instanceof NavigationEnd)
          this.getList();
      })
    );
  }

  protected override getList(): void {
    switch (this.filters.type) {
      case ItemGroup.NONE:
        this.searchService.getItems(this.page, this.sampleSize).subscribe(res => {
          if (res.status == 200)
            this.items = res.data ?? [];
        });
        break;
      case ItemGroup.SECTION:
        this.searchService.getItemsBySection(this.filters.group, this.page, this.sampleSize).subscribe(res => {
          if (res.status == 200)
            this.items = res.data ?? [];
        });
        break;
      case ItemGroup.CATEGORY:
        this.searchService.getItemsByCategory(this.filters.group, this.page, this.sampleSize).subscribe(res => {
          if (res.status == 200)
            this.items = res.data ?? [];
        });
        break;
    }
  }

  private changeFilters(params: Params): void {
    const paramArray = Object.entries(params);

    if (paramArray.length == 0)
      return;

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

  ngOnDestroy(): void {
    this._subs.forEach(sub => {
      sub?.unsubscribe();
    });
  }
}

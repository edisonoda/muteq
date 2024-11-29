import { Component, Inject } from '@angular/core';
import { ListComponent } from './list.component';
import { Item } from 'src/app/interfaces/item';
import { SearchService } from 'src/app/services/search.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ListElementComponent } from './list-element/list-element.component';

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
export class ItemListComponent extends ListComponent<Item> {
  private _filters: ListFilters = { type: ItemGroup.NONE, group: -1 };
  public get filters() { return this._filters; }
  public set filters(f: ListFilters) { this._filters = f; }

  constructor(@Inject(SearchService) searchService: SearchService, private router: Router) {
    super(searchService);
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

  public previewItem(id: number): void {
    this.router.navigate(['item', id]);
  }
}
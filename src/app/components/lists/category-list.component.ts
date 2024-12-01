import { Component, Inject } from '@angular/core';
import { ListComponent } from './list.component';
import { SearchService } from 'src/app/services/search.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Category } from 'src/app/interfaces/category';
import { Router } from '@angular/router';
import { ListElementComponent } from './list-element/list-element.component';


@Component({
  selector: 'app-categories',
  imports: [CommonModule, MatCardModule, MatButtonModule, ListElementComponent],
  templateUrl: './category-list.component.html',
  styleUrls: ['./list.component.css'],
})
export class CategoryListComponent extends ListComponent<Category> {
  constructor(@Inject(SearchService) searchService: SearchService, private router: Router) {
    super(searchService);
  }

  protected override getList(): void {
    this.searchService.getCategories(this.page, this.sampleSize).subscribe(res => {
      if (res.status == 200)
        this.items = res.data ?? [];
    });
  }

  public accessCategory(id: number): void {
    //accessCategory navega para a lista de itens
    this.router.navigate(['itens'], { queryParams: { category: id }});
  }
}

import { Component } from '@angular/core';
import { ListComponent } from './list.component';
import { CommonModule } from '@angular/common';
import { Category } from 'src/app/interfaces/category';
import { ListElementComponent } from './list-element/list-element.component';
import { PaginatorComponent } from './paginator/paginator';


@Component({
  selector: 'app-categories',
  imports: [CommonModule, ListElementComponent, PaginatorComponent],
  templateUrl: './category-list.component.html',
  styleUrls: ['./list.component.css'],
})
export class CategoryListComponent extends ListComponent<Category> {
  constructor() {
    super();
  }

  protected override getList(): void {
    this.searchService.getCategories(this.page, this.sampleSize).subscribe(res => {
      if (res.status == 200 && res.data) {
        this.elements = res.data.elements;
        this.count = res.data.count;
      }
    });
  }

  public accessCategory(id: number): void {
    //accessCategory navega para a lista de itens
    this.router.navigate(['items'], { queryParams: { category: id } });
  }
}

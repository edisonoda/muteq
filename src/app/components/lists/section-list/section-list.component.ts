import { Component } from '@angular/core';
import { ListComponent } from '../list.component';
import { CommonModule } from '@angular/common';
import { Section } from 'src/app/interfaces/section';
import { ListElementComponent } from '../list-element/list-element.component';
import { PaginatorComponent } from '../paginator/paginator';


@Component({
  selector: 'app-sections',
  imports: [CommonModule, ListElementComponent, PaginatorComponent],
  templateUrl: './section-list.component.html',
  styleUrls: ['../list.component.css'],
})
export class SectionListComponent extends ListComponent<Section> {
  constructor() {
    super();
  }

  protected override getList(): void {
    this.searchService.getSections(this.page, this.sampleSize).subscribe(res => {
      if (res) {
        this.elements = res.elements;
        this.count = res.count;
      }
    });
  }
  

  public accessSection(id: number): void {
    //accessSection navega para a lista de itens
    this.router.navigate(['items'], { queryParams: { section: id }});
  }
}

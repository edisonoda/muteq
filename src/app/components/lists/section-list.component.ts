import { Component, Inject } from '@angular/core';
import { ListComponent } from './list.component';
import { SearchService } from 'src/app/services/search.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Section } from 'src/app/interfaces/section';
import { Router } from '@angular/router';
import { ListElementComponent } from './list-element/list-element.component';


@Component({
  selector: 'app-sections',
  imports: [CommonModule, MatCardModule, MatButtonModule, ListElementComponent],
  templateUrl: './section-list.component.html',
  styleUrls: ['./list.component.css'],
})
export class SectionListComponent extends ListComponent<Section> {
  constructor(@Inject(SearchService) searchService: SearchService,  private router: Router) {
    super(searchService);
  }

  protected override getList(): void {
    this.searchService.getSections(this.page, this.sampleSize).subscribe(res => {
      if (res.status == 200)
        this.elements = res.data ?? [];
    });
  }
  

  public accessSection(id: number): void {
    //accessSection navega para a lista de itens
    this.router.navigate(['items'], { queryParams: { section: id }});
  }
}

import { Component } from '@angular/core';
import { ListComponent } from '../list.component';
import { CommonModule } from '@angular/common';
import { Section } from 'src/app/interfaces/section';
import { ListElementComponent } from '../list-element/list-element.component';
import { PaginatorComponent } from '../paginator/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';
import { listLoadAnimation } from 'src/app/utils/animations/list-load.animation';


@Component({
  selector: 'app-sections',
  imports: [CommonModule, ListElementComponent, PaginatorComponent, RouterModule, MatChipsModule, LoaderComponent],
  templateUrl: './section-list.component.html',
  styleUrls: ['../list.component.css'],
  animations: [listLoadAnimation]
})
export class SectionListComponent extends ListComponent<Section> {
  private _loading: boolean = true;
  public get loading() { return this._loading; }

  constructor() {
    super();
  }

  protected override getList(): void {
    this._loading = true;
    this.searchService.getSections(this.page, this.sampleSize).subscribe({
      next: res => {
        this._loading = false;

        if (res) {
          this.elements = res.elements;
          this.count = res.count;
        }
      },
      error: () => this._loading = false
    });
  }
  

  public accessSection(id: number): void {
    //accessSection navega para a lista de itens
    this.router.navigate(['items'], { queryParams: { section: id }});
  }
}

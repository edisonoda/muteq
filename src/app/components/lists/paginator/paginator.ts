import { Component, Injectable, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { ListComponent } from '../list.component';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = `Primeira página`;
  itemsPerPageLabel = `Itens por página:`;
  lastPageLabel = `Última página`;
  nextPageLabel = 'Próxima página';
  previousPageLabel = 'Página anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Página ${page + 1} de ${amountPages}`;
  }
}

@Component({
  selector: 'app-paginator',
  template: `
    <mat-paginator class="full-paginator"
        [length]="list.count"
        [pageSize]="list.sampleSize"
        [pageSizeOptions]="list.sizeOptions"
        (page)="list.pageChanged($event)"
        aria-label="Selecionar página">
    </mat-paginator>`,
  imports: [MatPaginatorModule],
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class PaginatorComponent {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  @Input()
  public list!: ListComponent;

  constructor() {}
}
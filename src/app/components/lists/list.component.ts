import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Listable } from '../../interfaces/listable';
import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

enum SampleSize {
  S = 5,
  M = 10,
  L = 20,
  XL = 50,
  XXL = 100
}

@Component({
  template: ''
})
export abstract class ListComponent<T = Listable> implements OnInit, OnDestroy {
  protected searchService: SearchService = inject(SearchService);
  protected route: ActivatedRoute = inject(ActivatedRoute);
  protected router: Router = inject(Router);

  private _elements: Array<T> = [];
  public get elements() { return this._elements; }
  public set elements(i: Array<T>) { this._elements = i; }

  private _count: number = 0;
  public get count() { return this._count; }
  public set count(c: number) { this._count = c; }

  private _page: number = 0;
  public get page() { return this._page; }
  public set page(p: number) {
    this._page = p;
    this.getList();
  }

  private _sampleSize: SampleSize = SampleSize.M;
  public get sampleSize() { return this._sampleSize; }
  public set sampleSize(s: SampleSize) {
    this._page = parseInt((this.page * this.sampleSize / s).toFixed(0));
    this._sampleSize = s;
    this.getList();
  }
  
  private _sizeOptions: Array<number> = Object.values(SampleSize).filter(v => typeof v == 'number');
  public get sizeOptions() { return this._sizeOptions }

  protected _subs: Array<Subscription> = [];

  constructor() {
    this._subs.push(
      // Verifica se possui paginação
      this.route.queryParams.subscribe(params => {
        const page = parseInt(params['page']);
        const size = parseInt(params['size']);

        if (page && size) {
          this._page = page;
          this.sampleSize = size;
        }
      })
    );
  }

  ngOnInit(): void {
    this.getList();
  }

  protected abstract getList(): void;
  
  public pageChanged(ev: PageEvent): void {
    if (ev.pageIndex != this.page)
      this.page = ev.pageIndex;

    if (ev.pageSize != this.sampleSize)
      this.sampleSize = ev.pageSize;
  }

  ngOnDestroy(): void {
    this._subs.forEach(sub => {
      sub?.unsubscribe();
    });
  }
}

import { Component } from '@angular/core';
import { Listable } from '../../interfaces/listable';
import { SearchService } from 'src/app/services/search.service';

enum SampleSize {
  S = 5,
  M = 10,
  L = 20,
  XL = 50,
  XXL = 100
}

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export abstract class ListComponent<T = Listable> {
  private _items: Array<T> = [];
  get items() { return this._items; }
  set items(i: Array<T>) { this._items = i; }

  private _count: number = 0;
  get count() { return this._count; }
  set count(c: number) { this._count = c; }

  private _page: number = 1;
  get page() { return this._page; }
  set page(p: number) {
    this._page = p;
    this.getList();
  }

  private _sampleSize: SampleSize = SampleSize.M;
  get sampleSize() { return this._sampleSize; }
  set sampleSize(s: SampleSize) {
    this.page = parseInt((this.page * this.sampleSize / s).toFixed(0));
    this._sampleSize = s;
    this.getList();
  }

  constructor(private searchService: SearchService) { }

  protected abstract getList(): void;
}

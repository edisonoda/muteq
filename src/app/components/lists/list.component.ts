import { Component, OnInit } from '@angular/core';
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
  template: '',
})
export abstract class ListComponent<T = Listable> implements OnInit {
  private _elements: Array<T> = [];
  public get elements() { return this._elements; }
  public set elements(i: Array<T>) { this._elements = i; }

  private _count: number = 0;
  public get count() { return this._count; }
  public set count(c: number) { this._count = c; }

  private _page: number = 1;
  public get page() { return this._page; }
  public set page(p: number) {
    this._page = p;
    this.getList();
  }

  private _sampleSize: SampleSize = SampleSize.M;
  public get sampleSize() { return this._sampleSize; }
  public set sampleSize(s: SampleSize) {
    this.page = parseInt((this.page * this.sampleSize / s).toFixed(0));
    this._sampleSize = s;
    this.getList();
  }

  constructor(protected searchService: SearchService) { }

  ngOnInit(): void {
    this.getList();
  }

  protected abstract getList(): void;
}

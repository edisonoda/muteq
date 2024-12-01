import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { Listable } from 'src/app/interfaces/listable';
import { Item } from 'src/app/interfaces/item';
import { Category } from 'src/app/interfaces/category';
import { Section } from 'src/app/interfaces/section';
import { SearchService } from 'src/app/services/search.service';
import { debounce, delayWhen, forkJoin, interval, map, Observable, of, pairwise, repeat, shareReplay, skipUntil, skipWhile, startWith, Subject, Subscription, switchMap, tap, timeInterval, timer } from 'rxjs';

interface SearchGroup {
  type: string;
  elements: Array<Listable>;
}

@Component({
  selector: 'app-search',
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AsyncPipe
  ],
  templateUrl: 'search.component.html',
  styleUrl: 'search.component.css'
})
export class SearchComponent {
  private _searchControl: FormControl = new FormControl('');
  public get searchControl() { return this._searchControl; }

  private _items: Array<Item> = [];
  public get items() { return this._items; }
  public set items(i: Array<Item>) {
    this._items = i;
    this._searchGroups[0].elements = this._items;
  }

  private _categories: Array<Category> = [];
  public get categories() { return this._categories; }
  public set categories(c: Array<Category>) {
    this._categories = c;
    this._searchGroups[1].elements = this._categories;
  }

  private _sections: Array<Section> = [];
  public get sections() { return this._sections; }
  public set sections(s: Array<Section>) {
    this._sections = s;
    this._searchGroups[2].elements = this._sections;
  }

  private _searchGroups: Array<SearchGroup> = [
    {
      type: 'Itens',
      elements: this._items
    },
    {
      type: 'Categorias',
      elements: this._categories
    },
    {
      type: 'Seções',
      elements: this._sections
    }
  ];
  public get searchGroups() { return this._searchGroups; }

  private _searchGroupsOptions: Observable<Array<SearchGroup>>;
  public get searchGroupsOptions() { return this._searchGroupsOptions; }
  
  private readonly _searchDelay: number = 1000;
  private _typing: boolean = false;

  constructor(private searchService: SearchService) {
    var timer: any;
    var lastValue: string = '';

    this._searchGroupsOptions = this._searchControl.valueChanges.pipe(
      debounce(() => interval(this._searchDelay)),
      // tap(val => {
      //   this._typing = true;
      //   clearTimeout(timer);
        
      //   timer = setTimeout(() => {
      //     this._typing = false;
      //     lastValue = val;
      //   }, this._searchDelay);
      // }),
      // skipWhile(() => this._typing),
      delayWhen(val => this.search(val)),
      map(() => this.searchGroups)
    );
  }

  private search(string: string): Observable<any> {
    if (!string)
      return of();

    return forkJoin([
      this.searchService.getItemsByName(string, 1, 5),
      this.searchService.getCategoriesByName(string, 1, 5),
      this.searchService.getSectionsByName(string, 1, 5),
    ]).pipe(tap(([itemRes, categoryRes, sectionRes]) => {
      if (itemRes.status == 200)
        this.items = itemRes.data ?? [];

      if (categoryRes.status == 200)
        this.categories = categoryRes.data ?? [];

      if (sectionRes.status == 200)
        this.sections = sectionRes.data ?? [];
    }));
  }
}
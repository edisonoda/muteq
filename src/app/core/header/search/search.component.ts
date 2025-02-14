import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { Listable } from 'src/app/interfaces/listable';
import { Item } from 'src/app/interfaces/item';
import { Category } from 'src/app/interfaces/category';
import { Section } from 'src/app/interfaces/section';
import { SearchService } from 'src/app/services/search.service';
import { debounce, delayWhen, forkJoin, interval, map, Observable, of, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from '../../../components/item/item.component';

interface SearchGroup {
  type: string;
  name: string;
  elements: Array<Listable>;
}

@Component({
  selector: 'app-search',
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
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
      type: 'item',
      name: 'Itens',
      elements: this._items
    },
    {
      type: 'category',
      name: 'Categorias',
      elements: this._categories
    },
    {
      type: 'section',
      name: 'Seções',
      elements: this._sections
    }
  ];
  public get searchGroups() { return this._searchGroups; }

  private _searchGroupsOptions: Observable<Array<SearchGroup>>;
  public get searchGroupsOptions() { return this._searchGroupsOptions; }

  private _noResults: boolean = false;
  public get noResults() { return this._noResults; }
  
  private readonly SEARCH_DELAY: number = 1000;
  private readonly ELEMENTS_LIMIT: number = 5;

  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly _dialog = inject(MatDialog);

  constructor(private searchService: SearchService, private router: Router) {
    this._searchGroupsOptions = this._searchControl.valueChanges.pipe(
      debounce(() => interval(this.SEARCH_DELAY)),
      delayWhen(val => this.search(val)),
      map(() => this.searchGroups)
    );
  }

  private search(string: string): Observable<any> {
    if (!string || typeof string != 'string')
      return of();

    return forkJoin([
      this.searchService.getItemsByName(string, 1, this.ELEMENTS_LIMIT + 1),
      this.searchService.getCategoriesByName(string, 1, this.ELEMENTS_LIMIT + 1),
      this.searchService.getSectionsByName(string, 1, this.ELEMENTS_LIMIT + 1),
    ]).pipe(tap(([itemRes, categoryRes, sectionRes]) => {
      if (itemRes)
        this.items = itemRes.elements;

      if (categoryRes)
        this.categories = categoryRes.elements;

      if (sectionRes)
        this.sections = sectionRes.elements;

      this._noResults = !this.items.length && !this.categories.length && !this.sections.length;
    }));
  }

  public navigate(): void {
    const value = (this.searchControl.value as string).split('-');
    const type = value[0];
    const id = value[1];

    if (!type || !id || isNaN(parseInt(id))) {
      this._snackBar.open('Ocorreu um erro ao acessar essa página!', 'Fechar', { duration: 3000 });
      return;
    }

    switch (type) {
      case 'item':
        this._dialog.open(ItemComponent, { data: id });
        break;
      case 'category':
        this.router.navigate(['items'], { queryParams: { category: id } });
        break
      case 'section':
        this.router.navigate(['items'], { queryParams: { section: id } });
        break
      default:
        this._snackBar.open('Ocorreu um erro ao acessar essa página!', 'Fechar', { duration: 3000 });
    }

    this.searchControl.setValue('');
  }

  public groupLabel(group: SearchGroup): string {
    var label = group.name + ' (';

    if (group.elements.length > this.ELEMENTS_LIMIT)
      label += '5+';
    else if (!group.elements.length)
      label += '0';
    else
      label += group.elements.length;

    return label + ')';
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../interfaces/item';
import { Section } from '../interfaces/section';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class AdmService {
  private readonly api: string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  public createItem(i: Item): Observable<any> {
    return this.http.post(`${this.api}item`, {
      item: i
    });
  }

  // TODO: Continue
  public editItem(id: number, i: Item): Observable<boolean> {
    return of(true);
  }

  public deleteItem(id: number): Observable<boolean> {
    return of(true);
  }

  public createSection(i: Section): Observable<boolean> {
    return of(true);
  }

  public editSection(id: number, i: Section): Observable<boolean> {
    return of(true);
  }

  public deleteSection(id: number): Observable<boolean> {
    return of(true);
  }

  public createCategory(i: Category): Observable<boolean> {
    return of(true);
  }

  public editCategory(id: number, i: Category): Observable<boolean> {
    return of(true);
  }

  public deleteCategory(id: number): Observable<boolean> {
    return of(true);
  }
}

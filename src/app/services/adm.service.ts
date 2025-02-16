import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
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
    return of(true).pipe(delay(3000));
  }

  public deleteItem(id: number): Observable<boolean> {
    return of(true).pipe(delay(3000));
  }

  public createSection(i: Section): Observable<boolean> {
    return of(true).pipe(delay(3000));
  }

  public editSection(id: number, i: Section): Observable<boolean> {
    return of(true).pipe(delay(3000));
  }

  public deleteSection(id: number): Observable<boolean> {
    return of(true).pipe(delay(3000));
  }

  public createCategory(i: Category): Observable<boolean> {
    return of(true).pipe(delay(3000));
  }

  public editCategory(id: number, i: Category): Observable<boolean> {
    return of(true).pipe(delay(3000));
  }

  public deleteCategory(id: number): Observable<boolean> {
    return of(true).pipe(delay(3000));
  }
}

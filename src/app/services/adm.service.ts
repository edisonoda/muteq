import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Item } from '../interfaces/item';
import { DefaultResponse } from './default-response';
import { Section } from '../interfaces/section';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class AdmService {
  private readonly api: string = "";

  constructor(private http: HttpClient) { }

  public createItem(i: Item): Observable<DefaultResponse<boolean>> {
    return of({ status: 200, data: true });
  }

  public editItem(id: number, i: Item): Observable<DefaultResponse<boolean>> {
    return of({ status: 200, data: true });
  }

  public deleteItem(id: number): Observable<DefaultResponse<boolean>> {
    return of({ status: 200, data: true });
  }

  public createSection(i: Section): Observable<DefaultResponse<boolean>> {
    return of({ status: 200, data: true });
  }

  public editSection(id: number, i: Section): Observable<DefaultResponse<boolean>> {
    return of({ status: 200, data: true });
  }

  public deleteSection(id: number): Observable<DefaultResponse<boolean>> {
    return of({ status: 200, data: true });
  }

  public createCategory(i: Category): Observable<DefaultResponse<boolean>> {
    return of({ status: 200, data: true });
  }

  public editCategory(id: number, i: Category): Observable<DefaultResponse<boolean>> {
    return of({ status: 200, data: true });
  }

  public deleteCategory(id: number): Observable<DefaultResponse<boolean>> {
    return of({ status: 200, data: true });
  }
}

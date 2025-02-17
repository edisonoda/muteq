import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Item } from '../interfaces/item';
import { Section } from '../interfaces/section';
import { Category } from '../interfaces/category';
import { LOADER } from '../interceptors/loader.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AdmService {
  private readonly api: string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  public uploadImage(image: Blob, path?: string): Observable<{ image: string }> {
    const form = new FormData();
    form.append("image", image);

    if (path)
      form.append("path", path);

    return this.http.post<{ image: string }>(`${this.api}image`, form, {
      context: new HttpContext().set(LOADER, "Enviando imagem"),
    });
  }

  public fetchImage(name: string): Promise<Response> {
    return fetch(`${this.api}image?name=${name}`);
  }

  public createItem(i: Item): Observable<any> {
    return this.http.post<boolean>(`${this.api}item`, i, {
      context: new HttpContext().set(LOADER, "Criando item"),
    });

    // return of(true).pipe(delay(3000));
  }

  public editItem(id: number, i: Item): Observable<boolean> {
    return this.http.put<boolean>(`${this.api}item/${id}`, i, {
      context: new HttpContext().set(LOADER, "Atualizando item"),
    });

    // return of(true).pipe(delay(3000));
  }

  public deleteItem(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.api}item/${id}`, {
      context: new HttpContext().set(LOADER, "Excluindo item"),
    });
    
    // return of(true).pipe(delay(3000));
  }

  public createSection(c: Section): Observable<boolean> {
    return this.http.post<boolean>(`${this.api}section`, c, {
      context: new HttpContext().set(LOADER, "Criando seção"),
    });

    // return of(true).pipe(delay(3000));
  }

  public editSection(id: number, c: Section): Observable<boolean> {
    return this.http.put<boolean>(`${this.api}section/${id}`, c, {
      context: new HttpContext().set(LOADER, "Atualizando seção"),
    });

    // return of(true).pipe(delay(3000));
  }

  public deleteSection(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.api}section/${id}`, {
      context: new HttpContext().set(LOADER, "Excluindo seção"),
    });

    // return of(true).pipe(delay(3000));
  }

  public createCategory(c: Category): Observable<boolean> {
    return this.http.post<boolean>(`${this.api}category`, c, {
      context: new HttpContext().set(LOADER, "Criando categoria"),
    });

    // return of(true).pipe(delay(3000));
  }

  public editCategory(id: number, c: Category): Observable<boolean> {
    return this.http.put<boolean>(`${this.api}category/${id}`, c, {
      context: new HttpContext().set(LOADER, "Atualizando categoria"),
    });

    // return of(true).pipe(delay(3000));
  }

  public deleteCategory(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.api}category/${id}`, {
      context: new HttpContext().set(LOADER, "Excluindo categoria"),
    });

    // return of(true).pipe(delay(3000));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, Subject } from 'rxjs';
import { DefaultResponse } from './default-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api: string = "";

  private _authChangedSource: Subject<void> = new Subject<void>();
  public authChanged$: Observable<void> = this._authChangedSource.asObservable();

  constructor(private http: HttpClient) { }

  public changeAuth(): void {
    this._authChangedSource.next();
  }

  public login(email: string, password: string): Observable<DefaultResponse<boolean>> {
    return of({ status: 200, data: true });
  }

  public logout(): Observable<DefaultResponse<boolean>> {
    localStorage.removeItem('token');
    this.changeAuth();
    return of({ status: 200, data: true });
  }
}

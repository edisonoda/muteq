import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { DefaultResponse } from './default-requests';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api: string = "http://localhost:8080/";

  private _authChangedSource: Subject<void> = new Subject<void>();
  public authChanged$: Observable<void> = this._authChangedSource.asObservable();

  constructor(private http: HttpClient) { }

  public changeAuth(): void {
    this._authChangedSource.next();
  }

  public login(email: string, password: string): Observable<HttpResponse<{ token: string }>> {
    return this.http.post<{ token: string }>(`${this.api}login`, { username: email, password }, {
      observe: 'response',
    });
  }

  public logout(): void {
    localStorage.removeItem('muteq-token');
    this.changeAuth();
    location.reload();
  }
}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private _scrolledSource: Subject<Event> = new Subject<Event>();
  public scrolled$: Observable<Event> = this._scrolledSource.asObservable();

  constructor() { }

  public scroll(ev: Event): void {
    this._scrolledSource.next(ev);
  }
}

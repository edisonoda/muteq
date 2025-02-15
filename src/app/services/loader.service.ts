import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface LoadingRequest {
  loading: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _changedSource: Subject<LoadingRequest> = new Subject<LoadingRequest>();
  public changed$: Observable<LoadingRequest> = this._changedSource.asObservable();

  constructor() { }

  public change(loading: LoadingRequest): void {
    this._changedSource.next(loading);
  }
}

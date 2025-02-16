import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface LoadingRequest {
  loading: boolean;
  url: string;
  message?: string;
  error?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _requestedSource: Subject<LoadingRequest> = new Subject<LoadingRequest>();
  public requested$: Observable<LoadingRequest> = this._requestedSource.asObservable();

  private _finishedSource: Subject<void> = new Subject<void>();
  public finished$: Observable<void> = this._finishedSource.asObservable();

  constructor() { }

  public request(loading: LoadingRequest): void {
    this._requestedSource.next(loading);
  }

  public finish(): void {
    this._finishedSource.next();
  }
}

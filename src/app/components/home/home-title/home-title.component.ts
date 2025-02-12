import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home-title',
  imports: [CommonModule],
  templateUrl: './home-title.component.html',
  styleUrls: ['./home-title.component.css'],
})
export class HomeTitleComponent implements OnDestroy {
  private _text: string = "";
  public get text() { return this._text; }
  @Input()
  public set text(t: string) {
    this._text = t;
  }

  private _passed: boolean = false;
  public get passed() { return this._passed; }
  public set passed(s: boolean) { this._passed = s; }

  private _sub: Subscription;

  constructor(private _elementRef: ElementRef, private homeService: HomeService) {
    this._sub = this.homeService.scrolled$.subscribe(ev => {
      this.checkPassed(ev);
    });
  }

  private checkPassed(ev: Event): void {
    const own: HTMLElement = this._elementRef.nativeElement as HTMLElement;
    this.passed = own.getBoundingClientRect().top < window.innerHeight / 2;
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}

import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScrollDraggableDirective } from 'src/app/utils/directives/scroll-draggable.directive';


interface CarouselBaseSettings {
  slideCount: number;
  pagination?: boolean;
  navigation?: boolean;
  gutters?: boolean;
}

export interface CarouselResponsivity extends CarouselBaseSettings {
  minWidth: number;
}

export interface CarouselSettings extends CarouselBaseSettings {
  responsivity: Array<CarouselResponsivity>;
}

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, ScrollDraggableDirective, MatButtonModule, MatIconModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements AfterViewInit {
  @ViewChildren("slide")
  private slides!: QueryList<ElementRef>;
  
  @ViewChild("wrapper")
  private wrapper!: ElementRef;

  @Output()
  public slideClicked: EventEmitter<number> = new EventEmitter<number>();

  private _template!: TemplateRef<any>;
  public get template() { return this._template; }
  @Input()
  public set template(t: TemplateRef<any>) { this._template = t; }

  private _elements: Array<any> = [];
  public get elements() { return this._elements; }
  @Input()
  public set elements(e: Array<any>) {
    this._elements = e;

    this.calcSlideWidth();
    setTimeout(() => this.scrollTo(0));
  }

  private _carouselSettings: CarouselSettings = {
    navigation: true,
    pagination: true,
    gutters: true,
    slideCount: 1,
    responsivity: [
      {
        slideCount: 4,
        minWidth: 1200
      },
      {
        slideCount: 3,
        minWidth: 992
      },
      {
        slideCount: 2,
        minWidth: 768
      }
    ]
  };
  public get carouselSettings() { return this._carouselSettings; }
  @Input()
  public set carouselSettings(s: CarouselSettings) {
    s.responsivity.sort((a, b) => b.minWidth - a.minWidth);
    this._carouselSettings = s;

    this.refreshCurrentSettings();
  }

  private _activeSettings: CarouselBaseSettings = this._carouselSettings;
  public get activeSettings() { return this._activeSettings; }

  private _slideCount: number = this._carouselSettings.slideCount;
  public get slideCount() { return this._slideCount; }

  private _slideWidth: number = 100 / this.slideCount;
  public get slideWidth() { return this._slideWidth; }

  private _activeSlide: number = 0;
  public get activeSlide() { return this._activeSlide; }

  @HostListener('window:resize', ['$event'])
  onWindowResize(ev: Event): void {
    this.refreshCurrentSettings();
  }

  constructor(private cdf: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.refreshCurrentSettings();
    setTimeout(() => this.scrollTo(0));
  }

  private refreshCurrentSettings(): void {
    this._activeSettings = { ...this._carouselSettings };

    this.carouselSettings.responsivity.some(r => {
      if (window.innerWidth > r.minWidth) {
        Object.assign(this._activeSettings, r);
        return true;
      }

      return false;
    });

    this._slideCount = this.activeSettings.slideCount;
    this.calcSlideWidth();
  }

  private calcSlideWidth(): void {
    if (this.elements.length <= this.slideCount)
      this._slideWidth = 100 / this.slideCount;
    else
      this._slideWidth = 95 / this.slideCount;

    this.cdf.detectChanges();
  }

  public onScroll(ev: Event): void {
    const target = ev.target as HTMLElement;
    const scroll = target.scrollLeft + target.offsetWidth / 2;

    let active = { index: 0, dist: Infinity };
    this.slides.forEach((s, index) => {
      const slide = s.nativeElement as HTMLElement;
      const dist = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - scroll);
      slide.style.scale = `${0.9 + (dist > 150 ? 0 : 1 - (dist / 150)) / 10}`;

      if (active.dist > dist)
        active = { index, dist };
    });

    this._activeSlide = active.index;
  }

  public scrollTo(index: number): void {
    const slide = this.slides.get(index)?.nativeElement as HTMLElement;
    const wrapper = this.wrapper.nativeElement as HTMLElement;
    if (!slide || !wrapper) return;

    wrapper.scroll({
      behavior: 'smooth',
      left: slide.offsetLeft + slide.offsetWidth / 2 - wrapper.offsetWidth / 2,
      top: slide.offsetTop + slide.offsetHeight / 2 - wrapper.offsetHeight / 2,
    });
  }

  public slideClick(id: number): void {
    this.slideClicked.emit(id);
  }
}

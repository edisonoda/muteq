import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../lists/list.component';
import { ListElementComponent } from '../lists/list-element/list-element.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { PaginatedList } from 'src/app/services/search.service';
import { Listable } from 'src/app/interfaces/listable';
import { ScrollDraggableDirective } from 'src/app/utils/directives/scroll-draggable.directive';

export interface CarouselResponsivity {
  slideCount: number;
  minWidth: number;
}

export enum CarouselOrientation {
  HORIZONTAL,
  VERTICAL
}

export interface CarouselSettings {
  responsivity: Array<CarouselResponsivity>;
  slideCount: number;
  pagination?: boolean;
  navigation?: boolean;
  gutters?: boolean;
  orientation?: CarouselOrientation;
}

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, ListElementComponent, ScrollDraggableDirective, MatButtonModule, MatIconModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css', '../lists/list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent<T extends Listable> extends ListComponent<T> implements AfterViewInit {
  @Output()
  public slideClicked: EventEmitter<number> = new EventEmitter<number>();

  private _getListRequest!: Observable<PaginatedList<T>>;
  public get getListRequest() { return this._getListRequest; }
  @Input()
  public set getListRequest(get: Observable<PaginatedList<T>>) {
    this._getListRequest = get;
  }

  private _carouselSettings: CarouselSettings = {
    orientation: CarouselOrientation.HORIZONTAL,
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
        slideCount: 5,
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
    this.refreshSlideCount();
  }

  private _windowWidth: number = window.innerWidth;
  public get windowWidth() { return this._windowWidth; }

  private _scrollProgress: number = 0;
  public get scrollProgress() { return this._scrollProgress; }

  private _slideCount: number = this._carouselSettings.slideCount;
  public get slideCount() { return this._slideCount; }

  private _slideWidth: number = 100 / this.slideCount;
  public get slideWidth() { return this._slideWidth; }

  @HostListener('window:resize', ['$event'])
  onWindowResize(ev: Event): void {
    this._windowWidth = window.innerWidth;
    this.refreshSlideCount();
  }

  constructor(private cdf: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit(): void {
    this.refreshSlideCount();
  }

  private refreshSlideCount(): void {
    this.carouselSettings.responsivity.some(r => {
      if (this.windowWidth > r.minWidth) {
        this._slideCount = r.slideCount;
        return true;
      }

      return false;
    }) ? null : this._slideCount = this.carouselSettings.slideCount;

    this.calcSlideWidth();
  }

  private calcSlideWidth(): void {
    if (this.elements.length <= this.slideCount)
      this._slideWidth = 100 / this.slideCount;
    else
      this._slideWidth = 95 / this.slideCount;

    this.cdf.detectChanges();
  }

  protected override getList(): void {
    this.getListRequest.subscribe(res => {
      if (res) {
        this.elements = res.elements;
        this.count = res.count;

        this.calcSlideWidth();
      }
    });
  }

  public onScroll(ev: Event): void {
    const target = ev.target as HTMLElement;
    this._scrollProgress = target.scrollLeft + target.offsetWidth / 2;
  }

  public updateSlideScale(slide: HTMLElement): number {
    const dist = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - this._scrollProgress);
    return (dist > 150 ? 0 : 1 - (dist / 150)) / 10;
  }

  public slideClick(id: number): void {
    this.slideClicked.emit(id);
  }
}

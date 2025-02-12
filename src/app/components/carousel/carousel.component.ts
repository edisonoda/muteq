import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../lists/list.component';
import { Item } from 'src/app/interfaces/item';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from '../item/item.component';
import { ListElementComponent } from '../lists/list-element/list-element.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  orientation?: CarouselOrientation;
}

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, ListElementComponent, MatButtonModule, MatIconModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css', '../lists/list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent extends ListComponent<Item> implements AfterViewInit {
  private readonly _dialog = inject(MatDialog);
  private _windowWidth: number = window.innerWidth;
  public get windowWidth() { return this._windowWidth; }

  private _carouselSettings: CarouselSettings = {
    orientation: CarouselOrientation.HORIZONTAL,
    navigation: true,
    pagination: true,
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

  private _slideCount: number = this._carouselSettings.slideCount;
  public get slideCount() { return this._slideCount; }

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

    this.cdf.detectChanges();
  }

  protected override getList(): void {
    this.searchService.getItems(this.page, this.sampleSize).subscribe(res => {
      if (res) {
        this.elements = res.elements;
        this.count = res.count;

        this.cdf.detectChanges();
      }
    });
  }

  public calcSlideWidth(): number {
    if (this.elements.length <= this.slideCount)
      return 100 / this.slideCount;

    return 95 / this.slideCount;
  }

  public previewItem(id: number): void {
    const dialogRef = this._dialog.open(ItemComponent, {
      data: id
    });
  }
}

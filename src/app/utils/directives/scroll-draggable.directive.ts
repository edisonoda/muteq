import { Directive, ElementRef, OnDestroy } from '@angular/core';

@Directive({
  selector: '[scrollDraggable]',
})
export class ScrollDraggableDirective {
  private _element: HTMLElement;
  private _children: HTMLCollection;

  private _mouseDown: boolean = false;
  private _startX: number = 0;
  private _startY: number = 0;
  private _scrollLeft: number = 0;
  private _scrollTop: number = 0;

  constructor(private el: ElementRef) {
    this._element = this.el.nativeElement;
    this._children = this._element.children;

    this._element.addEventListener('mousedown', (ev) => this.startDragging(ev));
    this._element.addEventListener('mouseup', (ev) => this.stopDragging(ev));
    this._element.addEventListener('mouseleave', (ev) => this.stopDragging(ev));
    this._element.addEventListener('mouseleave', (ev) => this.stopDragging(ev));
    this._element.addEventListener('mousemove', (ev) => this.move(ev));

    this._element.addEventListener('touchstart', (ev) => this.startDragging(ev));
    this._element.addEventListener('touchend', (ev) => this.stopDragging(ev));
    this._element.addEventListener('touchcancel', (ev) => this.stopDragging(ev));
    this._element.addEventListener('touchmove', (ev) => this.move(ev));
  }

  private startDragging(ev: MouseEvent | TouchEvent): void {
    this._mouseDown = true;
    this._startX = ev instanceof MouseEvent ? ev.pageX : ev.touches[0].pageX;
    this._startY = ev instanceof MouseEvent ? ev.pageY : ev.touches[0].pageY;
    this._scrollLeft = this._element.scrollLeft;
    this._scrollTop = this._element.scrollTop;

    this._element.classList.add('dragging');
  }

  private stopDragging(ev: MouseEvent | TouchEvent): void {
    this._mouseDown = false;
    this._element.classList.remove('dragging');
    this._element.classList.remove('moving');

    let closest = { el: this._children.item(0), dist: Infinity };
    for (let i = 0; i < this._children.length; i++) {
      const child = this._children.item(i) as HTMLElement;
      const distX = child.offsetLeft + child.offsetWidth / 2 - (this._element.scrollLeft + this._element.offsetWidth / 2);
      const distY = child.offsetTop + child.offsetHeight / 2 - (this._element.scrollTop + this._element.offsetHeight / 2);
      const dist = Math.sqrt(distX*distX + distY*distY);

      if (closest.dist > dist)
        closest = { el: child, dist: dist };
    }

    const child = closest.el as HTMLElement;
    this._element.scroll({
      behavior: 'smooth',
      left: child.offsetLeft + child.offsetWidth / 2 - this._element.offsetWidth / 2,
      top: child.offsetTop + child.offsetHeight / 2 - this._element.offsetHeight / 2,
    });
  }

  private move(ev: MouseEvent | TouchEvent): void {
    ev.preventDefault();

    if (!this._mouseDown) { return; }

    this._element.classList.add('moving');
    const x = ev instanceof MouseEvent ? ev.pageX : ev.touches[0].pageX - this._element.offsetLeft;
    const y = ev instanceof MouseEvent ? ev.pageY : ev.touches[0].pageY - this._element.offsetTop;
    const scrollX = x - this._startX;
    const scrollY = y - this._startY;

    this._element.scroll({
      behavior: 'instant',
      left: this._scrollLeft - scrollX,
      top: this._scrollTop - scrollY
    });
  }
}
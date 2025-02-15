import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const expandAnimation = trigger('expand', [
  transition(':enter', [
    group([
      style({ height: 0, opacity: 0, scale: 0.8 }),
      query(':self, *', style({ paddingBottom: 0, paddingTop: 0 }))
    ]),
    group([
      animate('.3s ease-in', style({ height: '*', opacity: 1, scale: 1 })),
      query(':self, *', animate('.3s ease-in', style({ paddingBottom: "*", paddingTop: "*" }))),
    ]),
  ]),
  transition(':leave', [
    group([
      style({ height: "*", opacity: 1, scale: 1 }),
      query(':self, *', style({ paddingBottom: "*", paddingTop: "*" }))
    ]),
    group([
      animate('.3s ease-in', style({ height: 0, opacity: 0, scale: 0.8 })),
      query(':self, *', animate('.3s ease-in', style({ paddingBottom: 0, paddingTop: 0 })))
    ]),
  ])
]);
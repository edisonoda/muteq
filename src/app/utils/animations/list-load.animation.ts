import { animate, group, query, stagger, style, transition, trigger } from '@angular/animations';

export const listLoadAnimation = trigger('listLoad', [
  transition('* <=> *', [
    query(':enter', [
      style({ opacity: 0, scale: 0.7, transform: 'translateY(-20%)' }),
      stagger(75, [
        animate('.3s ease-out', style({ opacity: 1, scale: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true }),
    query(':leave', [
      style({ opacity: 1, scale: 1, transform: 'translateY(0)' }),
      stagger(-75, [
        animate('.3s ease-out', style({ opacity: 0, scale: 0.7, transform: 'translateY(-20%)' }))
      ])
    ], { optional: true })
  ]),
]);
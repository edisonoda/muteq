import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const incrementAnimation = trigger('incrementAnimation', [
    transition(':increment', [
        query(':enter, :leave', style({ position: 'fixed', maxWidth: 'var(--page-max-width)', width: '100%' }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateX(100vw)' }),
                animate('1s ease-in-out', style({ transform: 'translateX(0)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0)' }),
                animate('1s ease-in-out', style({ transform: 'translateX(-100vw)' }))
            ], { optional: true })
        ])
    ]),
    transition(':decrement', [
        query(':enter, :leave', style({ position: 'fixed', maxWidth: 'var(--page-max-width)', width: '100%' }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateX(-100vw)' }),
                animate('1s ease-in-out', style({ transform: 'translateX(0)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0)' }),
                animate('1s ease-in-out', style({ transform: 'translateX(100vw)' }))
            ], { optional: true })
        ])
    ])
]);
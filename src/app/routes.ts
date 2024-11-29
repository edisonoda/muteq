import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Página Inicial',
    },
];
export default routeConfig;
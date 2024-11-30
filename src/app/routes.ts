import {Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/lists/item-list.component';
import { LoginComponent } from './components/login/login.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Página Inicial',
    },
    {
        path: 'itens',
        component: ItemListComponent,
        title: 'Itens',
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
    },
];
export default routeConfig;
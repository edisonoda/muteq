import {Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/lists/item-list.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryListComponent } from './components/lists/category-list.component';
import { SectionListComponent } from './components/lists/section-list.component copy';

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
    {
        path: 'categories',
        component: CategoryListComponent,
        title: 'Categorias',
    },
    {
        path: 'sections',
        component: SectionListComponent,
        title: 'Seções',
    },
];
export default routeConfig;
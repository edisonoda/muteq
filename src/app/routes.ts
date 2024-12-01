import {Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/lists/item-list.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryListComponent } from './components/lists/category-list.component';
import { SectionListComponent } from './components/lists/section-list.component';
import { CreateItemComponent } from './components/create-item-form/create-item-form';
import { CreateSectionComponent } from './components/create-section-form/create-section-form';
import { CreateCategoryComponent } from './components/create-category-form/create-category-form';

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
    {
        path: 'create-item',
        component: CreateItemComponent,
        title: 'Cadastrar Item',
    },
    {
        path: 'create-section',
        component: CreateSectionComponent,
        title: 'Criar Seção',
    },
    {
        path: 'create-category',
        component: CreateCategoryComponent,
        title: 'Criar Categoria',
    }
];
export default routeConfig;
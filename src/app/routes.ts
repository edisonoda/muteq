import {Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/lists/item-list.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryListComponent } from './components/lists/category-list.component';
import { SectionListComponent } from './components/lists/section-list.component';
import { ItemFormComponent } from './components/admin/item/item-form/item-form.component';
import { SectionFormComponent } from './components/admin/section/section-form/section-form.component';
import { CategoryFormComponent } from './components/admin/category/category-form/category-form.component';
import { ItemAdmComponent } from './components/admin/item/item-adm.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Página Inicial',
    },
    {
        path: 'items',
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
        path: 'adm',
        title: 'Adm',
        children: [
            {
                path: 'items',
                component: ItemAdmComponent,
                title: 'Itens'
            }
        ]
    },
    {
        path: 'create-item',
        component: ItemFormComponent,
        title: 'Cadastrar Item',
    },
    {
        path: 'create-section',
        component: SectionFormComponent,
        title: 'Criar Seção',
    },
    {
        path: 'create-category',
        component: CategoryFormComponent,
        title: 'Criar Categoria',
    }
];
export default routeConfig;
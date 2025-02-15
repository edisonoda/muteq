import { RouterStateSnapshot, Routes, TitleStrategy } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/lists/item-list/item-list.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryListComponent } from './components/lists/category-list/category-list.component';
import { SectionListComponent } from './components/lists/section-list/section-list.component';
import { ItemFormComponent } from './components/admin/item/item-form/item-form.component';
import { SectionFormComponent } from './components/admin/section/section-form/section-form.component';
import { CategoryFormComponent } from './components/admin/category/category-form/category-form.component';
import { ItemAdmComponent } from './components/admin/item/item-adm.component';
import { authGuard } from './guards/auth.guard';
import { CategoryAdmComponent } from './components/admin/category/category-adm.component';
import { SectionAdmComponent } from './components/admin/section/section-adm.component';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CoreComponent } from './core/core.component';

@Injectable({ providedIn: 'root' })
export class BaseTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`MUTEC | ${title}`);
    }
  }
}

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Página Inicial',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'items',
        component: ItemListComponent,
        title: 'Itens',
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
        canActivate: [authGuard],
        children: [
          {
            path: 'items',
            component: ItemAdmComponent,
            title: 'Itens'
          },
          {
            path: 'item',
            component: ItemFormComponent,
            title: 'Cadastrar Item',
          },
          {
            path: 'item/:id',
            component: ItemFormComponent,
            title: 'Editar Item',
          },
          {
            path: 'categories',
            component: CategoryAdmComponent,
            title: 'Categorias'
          },
          {
            path: 'category',
            component: CategoryFormComponent,
            title: 'Cadastrar Categoria',
          },
          {
            path: 'category/:id',
            component: CategoryFormComponent,
            title: 'Editar Categoria',
          },
          {
            path: 'sections',
            component: SectionAdmComponent,
            title: 'Seções'
          },
          {
            path: 'section',
            component: SectionFormComponent,
            title: 'Cadastrar Seção',
          },
          {
            path: 'section/:id',
            component: SectionFormComponent,
            title: 'Editar Seção',
          },
        ]
      },
    ]
  },
];
export default routeConfig;
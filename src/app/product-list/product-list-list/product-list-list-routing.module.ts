import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListListPage } from './product-list-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProductListListPage
  },
  {
    path: 'list-new',
    loadChildren: () => import('../list-new/list-new.module').then( m => m.ListNewPageModule)
  },
  {
    path: 'list-detail/:listId ',
    loadChildren: () => import('../list-detail/list-detail.module').then( m => m.ListDetailPageModule)
  },
  
  {
    path : 'list-add',
    loadChildren: () => import('../list-add/list-add.module').then( m => m.ListAddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductListListPageRoutingModule {}

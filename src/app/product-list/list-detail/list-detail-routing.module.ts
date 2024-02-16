import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDetailPage } from './list-detail.page';
const routes: Routes = [
  {
    path: '',
    component: ListDetailPage
  },
  {
    path: 'new-product/:listId',
    loadChildren: () => import('../product-new/product-new.module').then( m => m.ProductNewPageModule)
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListDetailPageRoutingModule {}

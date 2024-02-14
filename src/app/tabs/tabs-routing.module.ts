import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }, {
        path:'home',
        loadChildren: () => import('../home/home.module').then(m=>m.HomePageModule)
      },
  {
      path: 'list',
      loadChildren: () => import('../product-list/product-list.module').then( m => m.ProductListPageModule)
    },
    {
      path: 'lists',
      loadChildren: () => import('../product-list/product-list-list/product-list-list.module').then( m => m.ProductListListPageModule)
    },
    {
      path: 'about',
      loadChildren: () => import('../about/about.module').then( m => m.AboutPageModule)
    },
    
  ],
  }
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

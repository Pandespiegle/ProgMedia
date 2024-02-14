import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductListListPageRoutingModule } from './product-list-list-routing.module';

import { ProductListListPage } from './product-list-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductListListPageRoutingModule
  ],
  declarations: [ProductListListPage]
})
export class ProductListListPageModule {}

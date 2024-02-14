import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListNewPageRoutingModule } from './list-new-routing.module';
import { ListNewPage } from './list-new.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListNewPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ListNewPage]
})
export class ListNewPageModule {}

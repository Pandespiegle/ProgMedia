import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ListAddPageRoutingModule } from './list-add-routing.module';
import { ListAddPage } from './list-add.page';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListAddPageRoutingModule, 
    ReactiveFormsModule
  ],
  declarations: [ListAddPage]
})
export class ListAddPageModule {}

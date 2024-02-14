import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListDetailPageRoutingModule } from './list-detail-routing.module';
import { ListDetailPage } from './list-detail.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListDetailPageRoutingModule,
    QRCodeModule
  ],
  declarations: [ListDetailPage]
})
export class ListDetailPageModule {}

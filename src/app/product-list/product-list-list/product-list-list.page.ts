import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../../services/product-list.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-product-list-list',
  templateUrl: './product-list-list.page.html',
  styleUrls: ['./product-list-list.page.scss'],
})
export class ProductListListPage implements OnInit {

  lists: any;

  constructor(private productListService : ProductListService, private alertCtrl : AlertController,
    ) { }

  ngOnInit() {
   
    this.productListService.getByAllListIds().subscribe((data: any) => {
      this.lists = data;
    });
  }

  async leaveList(listId: string){

    const alert = await this.alertCtrl.create({
      header : 'Etes vous sur de vouloir supprimer ?',
      subHeader: 'Vous rendrez possible la suppression',
      buttons : [
        {
          text: 'Annuler',
          role: 'Cancel'
        }, {
          text: 'Supprimer',
          handler: () => { 
            this.productListService.deleteStorageListId(listId).subscribe(() => {
            this.productListService.getByAllListIds().subscribe((data: any) => {
              this.lists = data;
            });
          } );}
        }
      ]
    });
    await alert.present();

  }

  reload(){
    window.location.reload();
  }

  
    



  
}

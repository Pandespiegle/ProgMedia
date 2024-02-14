import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';
import { AlertController, IonModal } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProductListService } from 'src/app/services/product-list.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.page.html',
  styleUrls: ['./list-detail.page.scss'],
})
export class ListDetailPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal | undefined;
  products!: Array<Product>;
  listCode: string = '';
  list: any;

  constructor(private productService: ProductService,     
    private alertCtrl : AlertController,
    private route: ActivatedRoute,
    private listeService: ProductListService,
    private navCtrl: NavController

    ) {
      this.route.params.subscribe(params => {
         this.listCode = params['code '];
      });
    }

  ngOnInit() {

    this.listeService.getOneByCode(this.listCode).subscribe((data: any) => {
      this.list = data[0];
    }
    );


    this.productService.getAllByCode(this.listCode).subscribe((data: any) => {
      this.products = data;
      
    });
  }
  
  onCheck(product: Product) {
    this.productService.checkProduct(product);
  }

  async onDelete(id: any) {
    const alert = await this.alertCtrl.create({
      header : 'Etes vous sur de vouloir supprimer ?',
      subHeader: 'Vous rendrez possible la suppression',
      buttons : [
        {
          text: 'Annuler',
          role: 'Cancel'
        }, {
          text: 'Supprimer',
          handler: () => {this.productService.deleteProduct(id)}
        }
      ]
    });
    await alert.present();
  }

  cancel() {
    if (this.modal){
      this.modal.dismiss(null, 'cancel');
    }
  }

  async onDeleteList() {
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
            this.listeService.deleteProductList(this.list.id).subscribe(() => {
              this.listeService.deleteStorageCode(this.list.code);
              this.navCtrl.pop();
            }
            );
          }
        }
      ]
    });
    await alert.present();
    
  }
  
}


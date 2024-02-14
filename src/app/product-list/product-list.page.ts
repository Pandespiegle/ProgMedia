import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  products!: Array<Product>;
  

  constructor(private productService: ProductService,     
    private alertCtrl : AlertController,

    ) {}

  ngOnInit() {
    this.productService.getAll().subscribe((data: any) => {
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
}



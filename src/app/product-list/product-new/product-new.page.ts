import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.page.html',
  styleUrls: ['./product-new.page.scss'],
})
export class ProductNewPage implements OnInit {

  public product!: Product;
  public listId: any;
  listForm : FormGroup;

  constructor(
    private productService: ProductService,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private navCtrl: NavController

  ) { 
     this.listForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      
      });}

  ngOnInit() {
    this.listId = this.route.snapshot.paramMap.get('listId');
    this.product = new Product();
  }

  async presentToast() {
    const toast = this.toastController.create({
      message: 'Nouveau Produit enregistré',
      duration: 1000
    });
    (await toast).present().then(() => {
      setTimeout(() => {
       this.navCtrl.pop();
      }, 1000);
    });
  }

  addProduct(){
    this.product.list_id = this.listId;
    this.productService.addProduct(this.product).subscribe(() => {
      this.product = new Product();
      this.presentToast();
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ProductList } from 'src/app/models/product-list.model';
import { ProductListService } from 'src/app/services/product-list.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-new',
  templateUrl: './list-new.page.html',
  styleUrls: ['./list-new.page.scss'],
})
export class ListNewPage implements OnInit {

  public productList: ProductList = new ProductList();
  listForm : FormGroup;
  constructor(
    private productListService: ProductListService,
    private toastController: ToastController,
    private storage: Storage,
    private formBuilder: FormBuilder,
    private navCtrl: NavController

  ) {
    this.listForm = this.formBuilder.group({
    name: ['', Validators.required]
    });
  }

  async ngOnInit() {
    await this.storage.create();
  }
  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Nouveau Produit enregistré',
      duration: 1000
    });

    toast.present().then(() => {
      setTimeout(() => {
        this.navCtrl.pop();
      }, 500);
    });
  }

  addProductList() {
    const code = this.generateRandomString();
    this.productListService.addProductList({
      name: this.listForm.value.name,
      code: code
    }).subscribe(() => {
      this.productList = new ProductList();
      this.presentToast();
      
      this.storage.get('codeList').then((list) => {
        if (!list) {
          list = [];
        }
  
        list.push(code);
        this.storage.set('codeList', list);
      });
    });
  }
  

  generateRandomString(): string {
    const length = 15;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
  }
}

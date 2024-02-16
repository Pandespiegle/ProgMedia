import { Component, OnInit } from '@angular/core';
import { ProductList } from 'src/app/models/product-list.model';
import { ProductListService } from 'src/app/services/product-list.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private navCtrl: NavController,
    private router: Router

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
      message: 'Nouvelle liste créée',
    });

    toast.present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/lists']);  
      }, 500);
      

    });
  }

  addProductList() {
    this.productListService.addProductList({
      name: this.listForm.value.name,
    }).subscribe(() => {
      this.productList = new ProductList();
      this.presentToast();
    });
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ProductListService } from 'src/app/services/product-list.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-add',
  templateUrl: './list-add.page.html',
  styleUrls: ['./list-add.page.scss'],
})
export class ListAddPage implements OnInit {

  listForm : FormGroup;


  constructor(
    private storage: Storage,
    private productListService: ProductListService,    
    private formBuilder: FormBuilder,
    private navCtrl: NavController

    ) {
      this.listForm = this.formBuilder.group({
        code: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)] ],
        
        });

      
    }

  async ngOnInit() {
    await this.storage.create();

  }

  async addProductList() {
    const code = this.listForm.value.code;
    this.productListService.addStorageCode(code).subscribe(() => {
      this.listForm.value.code = '';
      this.navCtrl.pop();
    }
    );
  }

  async startScan() {

    await BarcodeScanner.checkPermission({ force: true });
    document.querySelector('body')!.classList.add('scanner-active');
  
    BarcodeScanner.hideBackground();
  
    const result = await BarcodeScanner.startScan(); 
  
    if (result.hasContent) {
      this.listForm.value.code = result.content;
      BarcodeScanner.stopScan();
      document.querySelector('body')!.classList.remove('scanner-active');
    }

  };

}

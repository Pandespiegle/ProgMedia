import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ProductList } from '../models/product-list.model';
import { Observable, map, combineLatest, of } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { from } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  private dbPath = '/lists';


  productListRef : AngularFirestoreCollection<ProductList>;

  constructor(
    private db: AngularFirestore,
    private storage: Storage

    ) {    
      this.storage.create();

      this.productListRef = db.collection(this.dbPath);
    }

    getAll(): any{
      return this.productListRef.snapshotChanges().pipe(
        map((changes: any) => {
          return changes.map((doc:any) => {
            return ({id: doc.payload.doc.id, ...doc.payload.doc.data()})
          })
        })
      );
    }

    addProductList(productList: ProductList): any{
      return new Observable((observer) => {
        this.productListRef.add({...productList}).then(() => {
          observer.next();
        });
      }
    )}

    deleteProductList(id: string): any{
      return new Observable((observer) => {
        this.productListRef.doc(id).delete().then(() => {
          observer.next();
        });
      });
    }



    getAllCodes(): Observable<any[]> {
      return from(this.storage.get('codeList')).pipe(
        map((codeList) => (Array.isArray(codeList) ? codeList : []))
      );
    }

    getAllByCodes(): Observable<any[]> {
      return from(this.getAllCodes()).pipe(
        switchMap((codes) => {
          return this.productListRef.snapshotChanges().pipe(
            map((changes: any) => {
              return changes.map((doc: any) => {
                return { id: doc.payload.doc.id, ...doc.payload.doc.data() };
              }).filter((product: any) => {
                return codes.includes(product.code);
              });
            })
          );
        })
      );
    }

  
    codeExists(code: string): Observable<boolean> {
    return this.getAllCodes().pipe(
      map((codes) => codes.includes(code))
    );
  }

    deleteStorageCode(code: string): any{
      return from(this.getAllCodes()).pipe(
        switchMap((codes) => {
          const newCodes = codes.filter((c) => c !== code);
          return from(this.storage.set('codeList', newCodes));
        })
      );
    }

    addStorageCode(code: string): any{
      return from(this.getAllCodes()).pipe(
        switchMap((codes) => {
          const newCodes = [...codes, code];
          return from(this.storage.set('codeList', newCodes));
        })
      );
    }

    getOneByCode(code : string ): Observable<any> {
          return this.productListRef.snapshotChanges().pipe(
            map((changes: any) => {
              return changes.map((doc: any) => {
                return { id: doc.payload.doc.id, ...doc.payload.doc.data() };
              }).filter((product: any) => {
                return product.code === code;
              });
            })
          );
    }

    

}

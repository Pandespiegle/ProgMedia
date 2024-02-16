import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ProductList } from '../models/product-list.model';
import { Observable, map, combineLatest, of, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { from } from 'rxjs';
import {  switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  private dbPath = '/lists';


  productListRef : AngularFirestoreCollection<ProductList>;

  constructor(
    private db: AngularFirestore,
    private storage: Storage,

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

    getById(id: string): any{
      return this.productListRef.doc(id).valueChanges();
    }

    updateProductList(id: string, value: any): any{
      return new Observable((observer) => {
        this.productListRef.doc(id).update(value).then(() => {
          observer.next();
        });
      });
    }

    addProductList(productList: ProductList): any{
      return new Observable((observer) => {
        this.productListRef.add({...productList}).then((doc) => {
          console.log(doc.id);
          this.storage.get("list-ids").then((listIds) => {
            if (listIds) {
              listIds.push(doc.id);
              this.storage.set("list-ids", listIds);
            } else {
              this.storage.set("list-ids", [doc.id]);
            }
          } );
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

    getAllListIds(): Observable<string[]> {
      return from(this.storage.get('list-ids')).pipe(
        map((listIds) => listIds || [])
      );
    }

   getByAllListIds(): any{
    return from(this.getAllListIds()).pipe(

      switchMap((listIds) => {
        return this.productListRef.snapshotChanges().pipe(
          map((changes: any) => {
            return changes.map((doc: any) => {
              return ({id: doc.payload.doc.id, ...doc.payload.doc.data()});
            }).filter((list: any) => listIds.includes(list.id));
          })
        );
      })
    );
  }

  
  
  listIdExists(code: string): Observable<boolean> {
    return this.getAllListIds().pipe(
      map((codes) => codes.includes(code))
    );
  }

    deleteStorageListId(id: string): any{
      return from(this.getAllListIds()).pipe(
        switchMap((listIds) => {
          const newIds = listIds.filter((listId) => listId !== id);
          return from(this.storage.set('list-ids', newIds));
        })
      );
    }

    addStorageListId(id: string): any{
      return from(this.getAllListIds()).pipe(
        switchMap((listIds) => {
          const newIds = listIds.concat(id);
          return from(this.storage.set('list-ids', newIds));
        })
      );
    }

  

    

}

import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/products';

  productsRef : AngularFirestoreCollection<Product>;


  constructor(
    private db: AngularFirestore
  ) { 
    this.productsRef = db.collection(this.dbPath);
  }

  getAll(): any{
    return this.productsRef.snapshotChanges().pipe(
      map((changes: any) => {
        return changes.map((doc:any) => {
          return ({id: doc.payload.doc.id, ...doc.payload.doc.data()})
        })
      })
    );
  }

  addProduct(product: Product): any{
    return new Observable((observer) => {
      this.productsRef.add({...product}).then(() => {
        observer.next();
      });
    }
  )};

  deleteProduct(id: any) {
    this.db.doc(`products/${id}`).delete();
  }

  checkProduct(product: Product) {
    this.db.doc(`products/${product.id}`).update({checked: product.checked})
  }

  getAllByCode(code: string): any{
    return this.productsRef.snapshotChanges().pipe(
      map((changes: any) => {
        return changes.map((doc:any) => {
          return ({id: doc.payload.doc.id, ...doc.payload.doc.data()})
        }).filter((product: Product) => product.code === code )
      })
    );
  }


}

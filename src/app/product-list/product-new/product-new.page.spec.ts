import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductNewPage } from './product-new.page';

describe('ProductNewPage', () => {
  let component: ProductNewPage;
  let fixture: ComponentFixture<ProductNewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProductNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListListPage } from './product-list-list.page';

describe('ProductListListPage', () => {
  let component: ProductListListPage;
  let fixture: ComponentFixture<ProductListListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProductListListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

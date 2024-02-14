import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListAddPage } from './list-add.page';

describe('ListAddPage', () => {
  let component: ListAddPage;
  let fixture: ComponentFixture<ListAddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

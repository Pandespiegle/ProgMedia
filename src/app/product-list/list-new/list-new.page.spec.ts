import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListNewPage } from './list-new.page';

describe('ListNewPage', () => {
  let component: ListNewPage;
  let fixture: ComponentFixture<ListNewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArkhamComponent } from './list-arkham.component';

describe('ListArkhamComponent', () => {
  let component: ListArkhamComponent;
  let fixture: ComponentFixture<ListArkhamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListArkhamComponent]
    });
    fixture = TestBed.createComponent(ListArkhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

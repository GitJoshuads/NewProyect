import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoDetailComponent } from './crypto-detail.component';

describe('CryptoDetailComponent', () => {
  let component: CryptoDetailComponent;
  let fixture: ComponentFixture<CryptoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CryptoDetailComponent]
    });
    fixture = TestBed.createComponent(CryptoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

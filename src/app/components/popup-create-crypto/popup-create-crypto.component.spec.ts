import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCreateCryptoComponent } from './popup-create-crypto.component';

describe('PopupCreateCryptoComponent', () => {
  let component: PopupCreateCryptoComponent;
  let fixture: ComponentFixture<PopupCreateCryptoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupCreateCryptoComponent]
    });
    fixture = TestBed.createComponent(PopupCreateCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

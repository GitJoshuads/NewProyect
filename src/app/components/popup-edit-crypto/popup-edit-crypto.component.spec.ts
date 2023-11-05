import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEditCryptoComponent } from './popup-edit-crypto.component';

describe('PopupEditCryptoComponent', () => {
  let component: PopupEditCryptoComponent;
  let fixture: ComponentFixture<PopupEditCryptoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupEditCryptoComponent]
    });
    fixture = TestBed.createComponent(PopupEditCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

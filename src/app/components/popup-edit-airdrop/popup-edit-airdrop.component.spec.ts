import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEditAirdropComponent } from './popup-edit-airdrop.component';

describe('PopupEditAirdropComponent', () => {
  let component: PopupEditAirdropComponent;
  let fixture: ComponentFixture<PopupEditAirdropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupEditAirdropComponent]
    });
    fixture = TestBed.createComponent(PopupEditAirdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

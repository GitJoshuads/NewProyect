import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArkhamComponent } from './arkham.component';

describe('ArkhamComponent', () => {
  let component: ArkhamComponent;
  let fixture: ComponentFixture<ArkhamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArkhamComponent]
    });
    fixture = TestBed.createComponent(ArkhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

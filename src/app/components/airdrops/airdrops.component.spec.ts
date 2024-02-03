import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirdropsComponent } from './airdrops.component';

describe('AirdropsComponent', () => {
  let component: AirdropsComponent;
  let fixture: ComponentFixture<AirdropsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AirdropsComponent]
    });
    fixture = TestBed.createComponent(AirdropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

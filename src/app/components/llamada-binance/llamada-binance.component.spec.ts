import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadaBinanceComponent } from './llamada-binance.component';

describe('LlamadaBinanceComponent', () => {
  let component: LlamadaBinanceComponent;
  let fixture: ComponentFixture<LlamadaBinanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LlamadaBinanceComponent]
    });
    fixture = TestBed.createComponent(LlamadaBinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

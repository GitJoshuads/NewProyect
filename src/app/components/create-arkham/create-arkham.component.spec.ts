import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArkhamComponent } from './create-arkham.component';

describe('CreateArkhamComponent', () => {
  let component: CreateArkhamComponent;
  let fixture: ComponentFixture<CreateArkhamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateArkhamComponent]
    });
    fixture = TestBed.createComponent(CreateArkhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAirdropComponent } from './create-airdrop.component';

describe('CreateAirdropComponent', () => {
  let component: CreateAirdropComponent;
  let fixture: ComponentFixture<CreateAirdropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAirdropComponent]
    });
    fixture = TestBed.createComponent(CreateAirdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

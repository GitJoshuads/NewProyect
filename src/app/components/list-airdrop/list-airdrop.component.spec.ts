import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAirdropComponent } from './list-airdrop.component';

describe('ListAirdropComponent', () => {
  let component: ListAirdropComponent;
  let fixture: ComponentFixture<ListAirdropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAirdropComponent]
    });
    fixture = TestBed.createComponent(ListAirdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

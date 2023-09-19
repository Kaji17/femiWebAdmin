import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStatsBestProductComponent } from './card-stats-best-product.component';

describe('CardStatsBestProductComponent', () => {
  let component: CardStatsBestProductComponent;
  let fixture: ComponentFixture<CardStatsBestProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardStatsBestProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardStatsBestProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

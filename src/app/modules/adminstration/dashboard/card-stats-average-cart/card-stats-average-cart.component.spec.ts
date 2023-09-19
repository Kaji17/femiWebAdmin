import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStatsAverageCartComponent } from './card-stats-average-cart.component';

describe('CardStatsAverageCartComponent', () => {
  let component: CardStatsAverageCartComponent;
  let fixture: ComponentFixture<CardStatsAverageCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardStatsAverageCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardStatsAverageCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

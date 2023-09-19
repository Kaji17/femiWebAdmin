import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStatsChartOrdersSalesComponent } from './card-stats-chart-orders-sales.component';

describe('CardStatsChartOrdersSalesComponent', () => {
  let component: CardStatsChartOrdersSalesComponent;
  let fixture: ComponentFixture<CardStatsChartOrdersSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardStatsChartOrdersSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardStatsChartOrdersSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

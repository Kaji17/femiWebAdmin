import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStatsPayMeansComponent } from './card-stats-pay-means.component';

describe('CardStatsPayMeansComponent', () => {
  let component: CardStatsPayMeansComponent;
  let fixture: ComponentFixture<CardStatsPayMeansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardStatsPayMeansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardStatsPayMeansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

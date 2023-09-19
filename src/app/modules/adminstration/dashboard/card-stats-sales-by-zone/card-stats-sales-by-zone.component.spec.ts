import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStatsSalesByZoneComponent } from './card-stats-sales-by-zone.component';

describe('CardStatsSalesByZoneComponent', () => {
  let component: CardStatsSalesByZoneComponent;
  let fixture: ComponentFixture<CardStatsSalesByZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardStatsSalesByZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardStatsSalesByZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

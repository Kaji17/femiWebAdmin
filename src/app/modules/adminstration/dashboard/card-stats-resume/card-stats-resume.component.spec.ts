import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStatsResumeComponent } from './card-stats-resume.component';

describe('CardStatsResumeComponent', () => {
  let component: CardStatsResumeComponent;
  let fixture: ComponentFixture<CardStatsResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardStatsResumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardStatsResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

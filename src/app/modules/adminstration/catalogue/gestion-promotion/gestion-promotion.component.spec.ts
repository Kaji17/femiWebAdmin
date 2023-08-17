import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPromotionComponent } from './gestion-promotion.component';

describe('GestionPromotionComponent', () => {
  let component: GestionPromotionComponent;
  let fixture: ComponentFixture<GestionPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRemovePromotionComponent } from './modal-remove-promotion.component';

describe('ModalRemovePromotionComponent', () => {
  let component: ModalRemovePromotionComponent;
  let fixture: ComponentFixture<ModalRemovePromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRemovePromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRemovePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

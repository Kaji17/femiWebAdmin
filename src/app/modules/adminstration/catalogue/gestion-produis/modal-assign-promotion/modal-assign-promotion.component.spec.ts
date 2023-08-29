import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssignPromotionComponent } from './modal-assign-promotion.component';

describe('ModalAssignPromotionComponent', () => {
  let component: ModalAssignPromotionComponent;
  let fixture: ComponentFixture<ModalAssignPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAssignPromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAssignPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

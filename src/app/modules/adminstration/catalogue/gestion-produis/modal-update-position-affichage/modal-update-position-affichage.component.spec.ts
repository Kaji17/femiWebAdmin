import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdatePositionAffichageComponent } from './modal-update-position-affichage.component';

describe('ModalUpdatePositionAffichageComponent', () => {
  let component: ModalUpdatePositionAffichageComponent;
  let fixture: ComponentFixture<ModalUpdatePositionAffichageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdatePositionAffichageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdatePositionAffichageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

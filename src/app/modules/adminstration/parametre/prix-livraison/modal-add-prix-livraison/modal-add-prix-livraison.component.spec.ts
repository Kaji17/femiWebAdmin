import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddPrixLivraisonComponent } from './modal-add-prix-livraison.component';

describe('ModalAddPrixLivraisonComponent', () => {
  let component: ModalAddPrixLivraisonComponent;
  let fixture: ComponentFixture<ModalAddPrixLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddPrixLivraisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddPrixLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

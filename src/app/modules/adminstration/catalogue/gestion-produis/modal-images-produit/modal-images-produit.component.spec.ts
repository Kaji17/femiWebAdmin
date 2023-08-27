import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImagesProduitComponent } from './modal-images-produit.component';

describe('ModalImagesProduitComponent', () => {
  let component: ModalImagesProduitComponent;
  let fixture: ComponentFixture<ModalImagesProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalImagesProduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalImagesProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

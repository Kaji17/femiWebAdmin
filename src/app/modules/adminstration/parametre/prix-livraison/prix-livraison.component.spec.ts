import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrixLivraisonComponent } from './prix-livraison.component';

describe('PrixLivraisonComponent', () => {
  let component: PrixLivraisonComponent;
  let fixture: ComponentFixture<PrixLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrixLivraisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrixLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

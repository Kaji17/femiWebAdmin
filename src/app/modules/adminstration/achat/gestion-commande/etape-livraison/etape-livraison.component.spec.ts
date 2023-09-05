import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapeLivraisonComponent } from './etape-livraison.component';

describe('EtapeLivraisonComponent', () => {
  let component: EtapeLivraisonComponent;
  let fixture: ComponentFixture<EtapeLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtapeLivraisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtapeLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

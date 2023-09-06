import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglerCommandeComponent } from './regler-commande.component';

describe('ReglerCommandeComponent', () => {
  let component: ReglerCommandeComponent;
  let fixture: ComponentFixture<ReglerCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReglerCommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReglerCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

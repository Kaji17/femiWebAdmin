import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefuserCommandeComponent } from './refuser-commande.component';

describe('RefuserCommandeComponent', () => {
  let component: RefuserCommandeComponent;
  let fixture: ComponentFixture<RefuserCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefuserCommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefuserCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

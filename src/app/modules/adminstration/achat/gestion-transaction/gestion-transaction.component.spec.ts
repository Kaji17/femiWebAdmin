import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTransactionComponent } from './gestion-transaction.component';

describe('GestionTransactionComponent', () => {
  let component: GestionTransactionComponent;
  let fixture: ComponentFixture<GestionTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

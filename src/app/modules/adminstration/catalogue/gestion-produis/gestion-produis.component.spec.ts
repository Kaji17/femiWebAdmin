import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProduisComponent } from './gestion-produis.component';

describe('GestionProduisComponent', () => {
  let component: GestionProduisComponent;
  let fixture: ComponentFixture<GestionProduisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionProduisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionProduisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

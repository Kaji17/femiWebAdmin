import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAstuceConseilComponent } from './gestion-astuce-conseil.component';

describe('GestionAstuceConseilComponent', () => {
  let component: GestionAstuceConseilComponent;
  let fixture: ComponentFixture<GestionAstuceConseilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionAstuceConseilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionAstuceConseilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

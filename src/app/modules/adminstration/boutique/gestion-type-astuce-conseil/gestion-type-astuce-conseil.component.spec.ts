import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTypeAstuceConseilComponent } from './gestion-type-astuce-conseil.component';

describe('GestionTypeAstuceConseilComponent', () => {
  let component: GestionTypeAstuceConseilComponent;
  let fixture: ComponentFixture<GestionTypeAstuceConseilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionTypeAstuceConseilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionTypeAstuceConseilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

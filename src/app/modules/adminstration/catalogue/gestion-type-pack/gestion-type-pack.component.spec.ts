import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTypePackComponent } from './gestion-type-pack.component';

describe('GestionTypePackComponent', () => {
  let component: GestionTypePackComponent;
  let fixture: ComponentFixture<GestionTypePackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionTypePackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionTypePackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

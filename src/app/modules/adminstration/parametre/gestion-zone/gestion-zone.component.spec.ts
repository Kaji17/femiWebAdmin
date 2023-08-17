import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionZoneComponent } from './gestion-zone.component';

describe('GestionZoneComponent', () => {
  let component: GestionZoneComponent;
  let fixture: ComponentFixture<GestionZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBanniereComponent } from './gestion-banniere.component';

describe('GestionBanniereComponent', () => {
  let component: GestionBanniereComponent;
  let fixture: ComponentFixture<GestionBanniereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionBanniereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionBanniereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

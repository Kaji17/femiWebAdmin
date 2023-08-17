import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDispositionComponent } from './gestion-disposition.component';

describe('GestionDispositionComponent', () => {
  let component: GestionDispositionComponent;
  let fixture: ComponentFixture<GestionDispositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDispositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDispositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisNoteComponent } from './avis-note.component';

describe('AvisNoteComponent', () => {
  let component: AvisNoteComponent;
  let fixture: ComponentFixture<AvisNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

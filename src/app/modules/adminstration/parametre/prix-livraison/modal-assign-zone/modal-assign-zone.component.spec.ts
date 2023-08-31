import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssignZoneComponent } from './modal-assign-zone.component';

describe('ModalAssignZoneComponent', () => {
  let component: ModalAssignZoneComponent;
  let fixture: ComponentFixture<ModalAssignZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAssignZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAssignZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

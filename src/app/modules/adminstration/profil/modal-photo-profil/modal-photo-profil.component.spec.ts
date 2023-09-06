import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPhotoProfilComponent } from './modal-photo-profil.component';

describe('ModalPhotoProfilComponent', () => {
  let component: ModalPhotoProfilComponent;
  let fixture: ComponentFixture<ModalPhotoProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPhotoProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPhotoProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

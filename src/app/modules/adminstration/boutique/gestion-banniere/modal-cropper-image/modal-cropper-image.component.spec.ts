import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCropperImageComponent } from './modal-cropper-image.component';

describe('ModalCropperImageComponent', () => {
  let component: ModalCropperImageComponent;
  let fixture: ComponentFixture<ModalCropperImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCropperImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCropperImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

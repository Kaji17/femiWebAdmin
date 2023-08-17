import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResetComponent } from './admin-reset.component';

describe('AdminResetComponent', () => {
  let component: AdminResetComponent;
  let fixture: ComponentFixture<AdminResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminResetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

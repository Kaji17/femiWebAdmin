import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRolePermissionComponent } from './gestion-role-permission.component';

describe('GestionRolePermissionComponent', () => {
  let component: GestionRolePermissionComponent;
  let fixture: ComponentFixture<GestionRolePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionRolePermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionRolePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

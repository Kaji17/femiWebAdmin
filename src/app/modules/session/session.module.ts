import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminForgotComponent } from './admin-forgot/admin-forgot.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminResetComponent } from './admin-reset/admin-reset.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SessionRoutingModule } from './session-routing.module';



@NgModule({
  declarations: [
    AdminForgotComponent,
    AdminLoginComponent,
    AdminResetComponent
  ],
  imports: [
    CommonModule,
    SessionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SessionModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminForgotComponent } from './admin-forgot/admin-forgot.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminResetComponent } from './admin-reset/admin-reset.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  { path: 'forgot-password', component: AdminForgotComponent },
  { path: 'reset-password', component: AdminResetComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },

  // { path: '', component: AdminLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule { }

import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =[
   {
    path: 'administration',
    component: AdminLayoutComponent,
    loadChildren: () => import('./modules/adminstration/administration.module').then(m => m.AdministrationModule)
  }, {
    path: 'session',
    component: AuthLayoutComponent,
    loadChildren: () => import('./modules/session/session.module').then(m => m.SessionModule)
  },  
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'session',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'session',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

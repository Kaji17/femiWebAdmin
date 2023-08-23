import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionAdministrateursComponent } from './gestion-administrateurs/gestion-administrateurs.component';
import { GestionClientsComponent } from './gestion-clients/gestion-clients.component';
import { GestionRolePermissionComponent } from './gestion-role-permission/gestion-role-permission.component';
import { GestionTypeUtilisateurComponent } from './gestion-type-utilisateur/gestion-type-utilisateur.component';

const routes: Routes = [
  { path: 'administrateur', component: GestionAdministrateursComponent },
  { path: 'client', component: GestionClientsComponent },
  { path: 'role-permission', component: GestionRolePermissionComponent },
  { path: 'type-user', component: GestionTypeUtilisateurComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RessourceHumaineRoutingModule { }

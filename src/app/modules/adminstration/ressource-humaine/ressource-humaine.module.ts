import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionClientsComponent } from './gestion-clients/gestion-clients.component';
import { GestionUtilisateursComponent } from './gestion-utilisateurs/gestion-utilisateurs.component';
import { GestionAdministrateursComponent } from './gestion-administrateurs/gestion-administrateurs.component';
import { RessourceHumaineRoutingModule } from './ressource-humaine-routing.module';
import { GestionRolePermissionComponent } from './gestion-role-permission/gestion-role-permission.component';
import { GestionTypeUtilisateurComponent } from './gestion-type-utilisateur/gestion-type-utilisateur.component';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    GestionClientsComponent,
    GestionUtilisateursComponent,
    GestionAdministrateursComponent,
    GestionRolePermissionComponent,
    GestionTypeUtilisateurComponent
  ],
  imports: [
    CommonModule,
    RessourceHumaineRoutingModule,
    ComponentsModule
  ]
})
export class RessourceHumaineModule { }

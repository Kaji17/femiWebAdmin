import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionClientsComponent } from './gestion-clients/gestion-clients.component';
import { GestionAdministrateursComponent } from './gestion-administrateurs/gestion-administrateurs.component';
import { RessourceHumaineRoutingModule } from './ressource-humaine-routing.module';
import { GestionRolePermissionComponent } from './gestion-role-permission/gestion-role-permission.component';
import { GestionTypeUtilisateurComponent } from './gestion-type-utilisateur/gestion-type-utilisateur.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TagInputModule } from "ngx-chips";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleModalComponent } from './gestion-role-permission/role-modal/role-modal.component';
import { RoleUpdateModalComponent } from './gestion-role-permission/role-update-modal/role-update-modal.component';
import { ModalAddComponent } from './gestion-administrateurs/modal-add/modal-add.component';
import { ModalUpdateComponent } from './gestion-administrateurs/modal-update/modal-update.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';


@NgModule({
  declarations: [
    GestionClientsComponent,
    GestionAdministrateursComponent,
    GestionRolePermissionComponent,
    GestionTypeUtilisateurComponent,
    RoleModalComponent,
    RoleUpdateModalComponent,
    ModalAddComponent,
    ModalUpdateComponent
  ],
  imports: [
    CommonModule,
    RessourceHumaineRoutingModule,
    ComponentsModule,
    NgxDatatableModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule
  ]
})
export class RessourceHumaineModule { }

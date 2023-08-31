import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrixLivraisonComponent } from './prix-livraison/prix-livraison.component';
import { GestionZoneComponent } from './gestion-zone/gestion-zone.component';
import { ParametreRoutingModule } from './parametre-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ModalAddPrixLivraisonComponent } from './prix-livraison/modal-add-prix-livraison/modal-add-prix-livraison.component';
import { ModalAssignZoneComponent } from './prix-livraison/modal-assign-zone/modal-assign-zone.component';


@NgModule({
  declarations: [
    PrixLivraisonComponent,
    GestionZoneComponent,
    ModalAddPrixLivraisonComponent,
    ModalAssignZoneComponent
  ],
  imports: [
    CommonModule,
    ParametreRoutingModule,
    ComponentsModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule
    ]
})
export class ParametreModule { }

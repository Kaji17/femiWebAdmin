import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrixLivraisonComponent } from './prix-livraison/prix-livraison.component';
import { GestionZoneComponent } from './gestion-zone/gestion-zone.component';
import { ParametreRoutingModule } from './parametre-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    PrixLivraisonComponent,
    GestionZoneComponent
  ],
  imports: [
    CommonModule,
    ParametreRoutingModule,
    ComponentsModule
    ]
})
export class ParametreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionCommandeComponent } from './gestion-commande/gestion-commande.component';
import { AchatRoutingModule } from './achat-routing.module';



@NgModule({
  declarations: [
    GestionCommandeComponent
  ],
  imports: [
    CommonModule,
    AchatRoutingModule
  ]
})
export class AchatModule { }

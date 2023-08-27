import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionCommandeComponent } from './gestion-commande/gestion-commande.component';
import { AchatRoutingModule } from './achat-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { GestionTransactionComponent } from './gestion-transaction/gestion-transaction.component';



@NgModule({
  declarations: [
    GestionCommandeComponent,
    GestionTransactionComponent
  ],
  imports: [
    CommonModule,
    AchatRoutingModule,
    ComponentsModule
  ]
})
export class AchatModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionCommandeComponent } from './gestion-commande/gestion-commande.component';
import { AchatRoutingModule } from './achat-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { GestionTransactionComponent } from './gestion-transaction/gestion-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectDropDownModule } from 'ngx-select-dropdown';



@NgModule({
  declarations: [
    GestionCommandeComponent,
    GestionTransactionComponent
  ],
  imports: [
    CommonModule,
    AchatRoutingModule,
    ComponentsModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule
    ]
})
export class AchatModule { }

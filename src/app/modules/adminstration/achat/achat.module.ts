import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionCommandeComponent } from './gestion-commande/gestion-commande.component';
import { AchatRoutingModule } from './achat-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { GestionTransactionComponent } from './gestion-transaction/gestion-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsCommandeComponent } from './gestion-commande/details-commande/details-commande.component';
import { ValiderCommandeComponent } from './gestion-commande/valider-commande/valider-commande.component';
import { RefuserCommandeComponent } from './gestion-commande/refuser-commande/refuser-commande.component';
import { EtapeLivraisonComponent } from './gestion-commande/etape-livraison/etape-livraison.component';



@NgModule({
  declarations: [
    GestionCommandeComponent,
    GestionTransactionComponent,
    DetailsCommandeComponent,
    ValiderCommandeComponent,
    RefuserCommandeComponent,
    EtapeLivraisonComponent
  ],
  imports: [
    CommonModule,
    AchatRoutingModule,
    ComponentsModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    NgbTooltipModule,
    ]
})
export class AchatModule { }

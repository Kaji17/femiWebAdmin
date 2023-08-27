import { NgModule } from '@angular/core';
import { GestionCommandeComponent } from './gestion-commande/gestion-commande.component';
import { RouterModule, Routes } from '@angular/router';
import { GestionTransactionComponent } from './gestion-transaction/gestion-transaction.component';

const routes: Routes = [
  { path: 'commandes', component: GestionCommandeComponent },
  { path: 'transaction', component: GestionTransactionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AchatRoutingModule { }

import { NgModule } from '@angular/core';
import { GestionCommandeComponent } from './gestion-commande/gestion-commande.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'commandes', component: GestionCommandeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AchatRoutingModule { }

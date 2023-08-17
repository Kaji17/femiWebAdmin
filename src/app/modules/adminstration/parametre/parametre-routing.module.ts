import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrixLivraisonComponent } from './prix-livraison/prix-livraison.component';
import { GestionZoneComponent } from './gestion-zone/gestion-zone.component';

const routes: Routes = [
  { path: 'prix-livraison', component: PrixLivraisonComponent },
  { path: 'zone', component: GestionZoneComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametreRoutingModule { }

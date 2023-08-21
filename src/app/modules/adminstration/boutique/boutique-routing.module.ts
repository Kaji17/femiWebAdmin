import { NgModule } from '@angular/core';
import { GestionBanniereComponent } from './gestion-banniere/gestion-banniere.component';
import { RouterModule, Routes } from '@angular/router';
import { GestionDispositionComponent } from './gestion-disposition/gestion-disposition.component';
import { GestionAstuceConseilComponent } from './gestion-astuce-conseil/gestion-astuce-conseil.component';
import { GestionTypeAstuceConseilComponent } from './gestion-type-astuce-conseil/gestion-type-astuce-conseil.component';


const routes: Routes = [
  { path: 'banniere', component: GestionBanniereComponent },
  { path: 'display', component: GestionDispositionComponent },
  { path: 'astuce-conseil', component: GestionAstuceConseilComponent },
  { path: 'type-astuce-conseil', component: GestionTypeAstuceConseilComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoutiqueRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionCategorieComponent } from './gestion-categorie/gestion-categorie.component';
import { GestionPacksComponent } from './gestion-packs/gestion-packs.component';
import { GestionProduisComponent } from './gestion-produis/gestion-produis.component';
import { GestionPromotionComponent } from './gestion-promotion/gestion-promotion.component';
import { GestionTypePackComponent } from './gestion-type-pack/gestion-type-pack.component';
const routes: Routes = [
  { path: 'categorie-produit', component: GestionCategorieComponent },
  { path: 'packs', component: GestionPacksComponent },
  { path: 'produits', component: GestionProduisComponent },
  { path: 'promotions', component: GestionPromotionComponent },
  { path: 'typepack', component: GestionTypePackComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }

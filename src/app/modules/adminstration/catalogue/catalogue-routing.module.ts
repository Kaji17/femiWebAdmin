import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionCategorieComponent } from './gestion-categorie/gestion-categorie.component';
import { GestionPacksComponent } from './gestion-packs/gestion-packs.component';
import { GestionProduisComponent } from './gestion-produis/gestion-produis.component';
import { GestionPromotionComponent } from './gestion-promotion/gestion-promotion.component';
import { GestionTypePackComponent } from './gestion-type-pack/gestion-type-pack.component';
import { CreateProduitComponent } from './gestion-produis/create-produit/create-produit.component';

const routes: Routes = [
  { path: '', component: GestionProduisComponent },
  { path: 'categorie-produit', component: GestionCategorieComponent },
  { path: 'packs', component: GestionPacksComponent },
  { path: 'produits', component: GestionProduisComponent },
  { path: 'promotions', component: GestionPromotionComponent },
  { path: 'type-pack', component: GestionTypePackComponent },
  { path: 'create-produit', component: CreateProduitComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }

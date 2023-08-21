import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionCategorieComponent } from './gestion-categorie/gestion-categorie.component';
import { GestionPacksComponent } from './gestion-packs/gestion-packs.component';
import { GestionProduisComponent } from './gestion-produis/gestion-produis.component';
import { GestionPromotionComponent } from './gestion-promotion/gestion-promotion.component';
import { GestionTypePackComponent } from './gestion-type-pack/gestion-type-pack.component';
import { AvisNoteComponent } from './gestion-produis/avis-note/avis-note.component';

const routes: Routes = [
  { path: '', component: GestionProduisComponent },
  { path: 'categorie-produit', component: GestionCategorieComponent },
  { path: 'packs', component: GestionPacksComponent },
  { path: 'produits', component: GestionProduisComponent },
  { path: 'produits/avisNote', component: AvisNoteComponent },
  { path: 'produits/:id', component: AvisNoteComponent },
  { path: 'promotions', component: GestionPromotionComponent },
  { path: 'type-pack', component: GestionTypePackComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionPacksComponent } from './gestion-packs/gestion-packs.component';
import { GestionProduisComponent } from './gestion-produis/gestion-produis.component';
import { GestionPromotionComponent } from './gestion-promotion/gestion-promotion.component';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { GestionCategorieComponent } from './gestion-categorie/gestion-categorie.component';
import { GestionTypePackComponent } from './gestion-type-pack/gestion-type-pack.component';



@NgModule({
  declarations: [
    GestionPromotionComponent,
    GestionPacksComponent,
    GestionProduisComponent,
    GestionCategorieComponent,
    GestionTypePackComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule
  ]
})
export class CatalogueModule { }

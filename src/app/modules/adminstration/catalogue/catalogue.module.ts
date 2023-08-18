import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionPacksComponent } from './gestion-packs/gestion-packs.component';
import { GestionProduisComponent } from './gestion-produis/gestion-produis.component';
import { GestionPromotionComponent } from './gestion-promotion/gestion-promotion.component';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { GestionCategorieComponent } from './gestion-categorie/gestion-categorie.component';
import { GestionTypePackComponent } from './gestion-type-pack/gestion-type-pack.component';
import { CreateProduitComponent } from './gestion-produis/create-produit/create-produit.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';




@NgModule({
  declarations: [
    GestionPromotionComponent,
    GestionPacksComponent,
    GestionProduisComponent,
    GestionCategorieComponent,
    GestionTypePackComponent,
    CreateProduitComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    ComponentsModule,
    NgxDatatableModule
  ]
})
export class CatalogueModule { }

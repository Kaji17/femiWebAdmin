import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionPacksComponent } from './gestion-packs/gestion-packs.component';
import { GestionProduisComponent } from './gestion-produis/gestion-produis.component';
import { GestionPromotionComponent } from './gestion-promotion/gestion-promotion.component';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { GestionCategorieComponent } from './gestion-categorie/gestion-categorie.component';
import { GestionTypePackComponent } from './gestion-type-pack/gestion-type-pack.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AvisNoteComponent } from './gestion-produis/avis-note/avis-note.component';





@NgModule({
  declarations: [
    GestionPromotionComponent,
    GestionPacksComponent,
    GestionProduisComponent,
    GestionCategorieComponent,
    GestionTypePackComponent,
    AvisNoteComponent,
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    ComponentsModule,
    NgxDatatableModule,
    RouterModule,
    AppRoutingModule
  ]
})
export class CatalogueModule { }

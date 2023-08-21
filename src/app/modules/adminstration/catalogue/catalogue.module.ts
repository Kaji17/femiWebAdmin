import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GestionPacksComponent } from "./gestion-packs/gestion-packs.component";
import { GestionProduisComponent } from "./gestion-produis/gestion-produis.component";
import { GestionPromotionComponent } from "./gestion-promotion/gestion-promotion.component";
import { CatalogueRoutingModule } from "./catalogue-routing.module";
import { GestionCategorieComponent } from "./gestion-categorie/gestion-categorie.component";
import { GestionTypePackComponent } from "./gestion-type-pack/gestion-type-pack.component";
import { ComponentsModule } from "src/app/components/components.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { RouterModule } from "@angular/router";
import { TagInputModule } from "ngx-chips";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; // this is needed!
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    GestionPromotionComponent,
    GestionPacksComponent,
    GestionProduisComponent,
    GestionCategorieComponent,
    GestionTypePackComponent,
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    ComponentsModule,
    NgxDatatableModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class CatalogueModule {}

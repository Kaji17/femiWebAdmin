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
import { TagInputModule } from "ngx-chips";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectDropDownModule } from 'ngx-select-dropdown'


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
    ReactiveFormsModule,
    SelectDropDownModule
  ],
})
export class CatalogueModule {}

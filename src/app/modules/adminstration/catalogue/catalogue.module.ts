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
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ModalAddComponent } from './gestion-produis/modal-add/modal-add.component';
import { ModalUpdateComponent } from './gestion-produis/modal-update/modal-update.component';
import { ModalDeleteComponent } from './gestion-produis/modal-delete/modal-delete.component';
import { ModalDetailsComponent } from './gestion-produis/modal-details/modal-details.component';
import { ModalImagesProduitComponent } from './gestion-produis/modal-images-produit/modal-images-produit.component';
import { ModalAssignPromotionComponent } from './gestion-produis/modal-assign-promotion/modal-assign-promotion.component';
import { ModalRemovePromotionComponent } from './gestion-produis/modal-remove-promotion/modal-remove-promotion.component'
import { CreateProduitComponent } from "./gestion-produis/create-produit/create-produit.component";
import { ModalUpdatePositionAffichageComponent } from './gestion-produis/modal-update-position-affichage/modal-update-position-affichage.component';
import { NgbRatingModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { DetailsProduitComponent } from './gestion-produis/details-produit/details-produit.component';

// import { DateTimeModule } from 'nxt-pick-datetime'
// import { NativeDateTimeModule } from 'nxt-pick-datetime/native-adapter'

@NgModule({
  declarations: [
    GestionPromotionComponent,
    GestionPacksComponent,
    GestionProduisComponent,
    GestionCategorieComponent,
    GestionTypePackComponent,
    ModalAddComponent,
    ModalUpdateComponent,
    ModalDeleteComponent,
    ModalDetailsComponent,
    ModalImagesProduitComponent,
    ModalAssignPromotionComponent,
    ModalRemovePromotionComponent,
    CreateProduitComponent,
    ModalUpdatePositionAffichageComponent,
    DetailsProduitComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    ComponentsModule,
    NgxDatatableModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    NgbTooltipModule,
    NgbRatingModule
    // DateTimeModule,
    // NativeDateTimeModule
  ],
})
export class CatalogueModule {}

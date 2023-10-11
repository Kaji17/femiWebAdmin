import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GestionBanniereComponent } from "./gestion-banniere/gestion-banniere.component";
import { GestionDispositionComponent } from "./gestion-disposition/gestion-disposition.component";
import { GestionAstuceConseilComponent } from "./gestion-astuce-conseil/gestion-astuce-conseil.component";
import { GestionTypeAstuceConseilComponent } from "./gestion-type-astuce-conseil/gestion-type-astuce-conseil.component";
import { BoutiqueRoutingModule } from "./boutique-routing.module";
import { ComponentsModule } from "src/app/components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SelectDropDownModule } from "ngx-select-dropdown";
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ModalCropperImageComponent } from './gestion-banniere/modal-cropper-image/modal-cropper-image.component';

@NgModule({
  declarations: [
    GestionBanniereComponent,
    GestionDispositionComponent,
    GestionAstuceConseilComponent,
    GestionTypeAstuceConseilComponent,
    ModalCropperImageComponent,
  ],
  imports: [
    CommonModule,
    BoutiqueRoutingModule,
    ComponentsModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    NgbTooltipModule,
    ImageCropperModule
  ],
})
export class BoutiqueModule {}

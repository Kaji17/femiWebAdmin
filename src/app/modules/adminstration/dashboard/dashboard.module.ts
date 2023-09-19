import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';
import { DasboardRoutingModule } from './dasboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { CardStatsSalesByZoneComponent } from './card-stats-sales-by-zone/card-stats-sales-by-zone.component';
import { CardStatsBestProductComponent } from './card-stats-best-product/card-stats-best-product.component';
import { CardStatsAverageCartComponent } from './card-stats-average-cart/card-stats-average-cart.component';
import { CardStatsPayMeansComponent } from './card-stats-pay-means/card-stats-pay-means.component';
import { CardStatsChartOrdersSalesComponent } from './card-stats-chart-orders-sales/card-stats-chart-orders-sales.component';
import { CardStatsResumeComponent } from './card-stats-resume/card-stats-resume.component';



@NgModule({
  declarations: [
    DashboardComponent,
    CardStatsSalesByZoneComponent,
    CardStatsBestProductComponent,
    CardStatsAverageCartComponent,
    CardStatsPayMeansComponent,
    CardStatsChartOrdersSalesComponent,
    CardStatsResumeComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    DasboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgxDatatableModule,
    RouterModule,
    SelectDropDownModule,
    TranslateModule.forChild({
      // isolate: true,
      extend:true
  }),
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }

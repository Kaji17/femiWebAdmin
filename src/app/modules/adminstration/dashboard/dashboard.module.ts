import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';
import { DasboardRoutingModule } from './dasboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    DasboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgxDatatableModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }

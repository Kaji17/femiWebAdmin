import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { ProfilComponent } from './profil/profil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [  
    ProfilComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    TranslateModule.forChild({
      // isolate: true,
      extend:true
  }),
  ],
  exports:[
  ]
})
export class AdministrationModule { }

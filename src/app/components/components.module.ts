import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TranslateModule, TranslateLoader, TranslateCompiler, TranslateParser, MissingTranslationHandler } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    TranslateModule.forChild({
      // isolate: true,
      extend:true
  }),
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    StarRatingComponent,
    PaginationComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    StarRatingComponent
  ]
})
export class ComponentsModule { }

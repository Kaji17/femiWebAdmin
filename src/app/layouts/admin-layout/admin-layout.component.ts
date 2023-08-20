import { Component, DoCheck, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  public itemsbreadcrumb: any[]
  public tittelbreadcrumb:string ='Dasboard'
  constructor(
    private breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.itemsbreadcrumb = this.breadcrumbService.getData()
    this.tittelbreadcrumb = this.breadcrumbService.getDataTitle()
    console.log('LLLL',this.itemsbreadcrumb)
    // this.itemsbreadcrumb = [
    //   { name: "Accueil", path: "/administration/dasboard" },
    //   { name: "Dasboard", path: "/administration/dasboard" },
    // ];
  }


}

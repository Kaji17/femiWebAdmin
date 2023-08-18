import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-banniere',
  templateUrl: './gestion-banniere.component.html',
  styleUrls: ['./gestion-banniere.component.scss']
})
export class GestionBanniereComponent implements OnInit {

  public itemsbreadcrumb: any[]
  public tittelbreadcrumb:string ='Bannière'
  constructor() { }

  ngOnInit(): void {
    this.itemsbreadcrumb = [
      { name: "Accueil", path: "/administration/dasboard" },
      { name: "Boutique", path: "/administration/dasboard" },
      { name: "Bannière", path: "/administration/dasboard" },
    ];
  }

}

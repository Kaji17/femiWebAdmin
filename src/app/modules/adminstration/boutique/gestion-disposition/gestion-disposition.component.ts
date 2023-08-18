import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-disposition',
  templateUrl: './gestion-disposition.component.html',
  styleUrls: ['./gestion-disposition.component.scss']
})
export class GestionDispositionComponent implements OnInit {

  public itemsbreadcrumb: any[]
  public tittelbreadcrumb:string ='Disposition produit'
  constructor() { }

  ngOnInit(): void {
    this.itemsbreadcrumb = [
      { name: "Accueil", path: "/administration/dasboard" },
      { name: "Boutique", path: "/administration/dasboard" },
      { name: "Disposition produit", path: "/administration/dasboard" },
    ];
  }

}

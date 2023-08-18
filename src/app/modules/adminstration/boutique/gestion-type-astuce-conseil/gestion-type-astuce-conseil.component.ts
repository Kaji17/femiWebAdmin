import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-type-astuce-conseil',
  templateUrl: './gestion-type-astuce-conseil.component.html',
  styleUrls: ['./gestion-type-astuce-conseil.component.scss']
})
export class GestionTypeAstuceConseilComponent implements OnInit {

  public itemsbreadcrumb: any[]
  public tittelbreadcrumb:string ='Type astuce'
  constructor() { }

  ngOnInit(): void {
    this.itemsbreadcrumb = [
      { name: "Accueil", path: "/administration/dasboard" },
      { name: "Boutique", path: "/administration/dasboard" },
      { name: "Type astuce", path: "/administration/dasboard" },
    ];
  }

}

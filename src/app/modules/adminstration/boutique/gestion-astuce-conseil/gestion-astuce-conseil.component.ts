import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-astuce-conseil',
  templateUrl: './gestion-astuce-conseil.component.html',
  styleUrls: ['./gestion-astuce-conseil.component.scss']
})
export class GestionAstuceConseilComponent implements OnInit {

  public itemsbreadcrumb: any[]
  public tittelbreadcrumb:string ='Astuce & Conseil'
  constructor() { }

  ngOnInit(): void {
    this.itemsbreadcrumb = [
      { name: "Accueil", path: "/administration/dasboard" },
      { name: "Boutique", path: "/administration/dasboard" },
      { name: "Astuce & Conseil", path: "/administration/dasboard" },
    ];
  }

}

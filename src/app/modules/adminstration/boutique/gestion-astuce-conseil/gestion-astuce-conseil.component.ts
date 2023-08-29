import { Component, OnInit } from '@angular/core';
import { RolePermissionsService } from 'src/app/shared/services/role-permissions.service';

@Component({
  selector: 'app-gestion-astuce-conseil',
  templateUrl: './gestion-astuce-conseil.component.html',
  styleUrls: ['./gestion-astuce-conseil.component.scss']
})
export class GestionAstuceConseilComponent implements OnInit {

  public itemsbreadcrumb: any[]
  public tittelbreadcrumb:string ='Astuce & Conseil'

  public crudPerms: any;
  public menuItems: any[];
  constructor(
    private rolePermission: RolePermissionsService,

  ) { }

  ngOnInit(): void {
    this.menuItems = this.rolePermission.getMenuPermission();

    this.crudPerms = {
      create: this.menuItems[2].items[0].create,
      update: this.menuItems[2].items[0].update,
      delete: this.menuItems[2].items[0].delete,
    };
    this.itemsbreadcrumb = [
      { name: "Accueil", path: "/administration/dasboard" },
      { name: "Boutique", path: "/administration/dasboard" },
      { name: "Astuce & Conseil", path: "/administration/dasboard" },
    ];
  }

}

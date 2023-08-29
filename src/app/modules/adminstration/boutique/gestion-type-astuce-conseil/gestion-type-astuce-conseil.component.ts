import { Component, OnInit } from '@angular/core';
import { RolePermissionsService } from 'src/app/shared/services/role-permissions.service';

@Component({
  selector: 'app-gestion-type-astuce-conseil',
  templateUrl: './gestion-type-astuce-conseil.component.html',
  styleUrls: ['./gestion-type-astuce-conseil.component.scss']
})
export class GestionTypeAstuceConseilComponent implements OnInit {

  public itemsbreadcrumb: any[]
  public tittelbreadcrumb:string ='Type astuce'

  public crudPerms: any;
  public menuItems: any[];
  constructor(
    private rolePermission: RolePermissionsService,

  ) { }

  ngOnInit(): void {
    this.menuItems = this.rolePermission.getMenuPermission();

    this.crudPerms = {
      create: this.menuItems[2].items[3].create,
      update: this.menuItems[2].items[3].update,
      delete: this.menuItems[2].items[3].delete,
    };
    this.itemsbreadcrumb = [
      { name: "Accueil", path: "/administration/dasboard" },
      { name: "Boutique", path: "/administration/dasboard" },
      { name: "Type astuce", path: "/administration/dasboard" },
    ];
  }

}

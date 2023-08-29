import { Component, OnInit } from '@angular/core';
import { RolePermissionsService } from 'src/app/shared/services/role-permissions.service';

@Component({
  selector: 'app-gestion-banniere',
  templateUrl: './gestion-banniere.component.html',
  styleUrls: ['./gestion-banniere.component.scss']
})
export class GestionBanniereComponent implements OnInit {

  public itemsbreadcrumb: any[]
  public tittelbreadcrumb:string ='Bannière'

  public crudPerms: any;
  public menuItems: any[];
  constructor(
    private rolePermission: RolePermissionsService,

  ) { }

  ngOnInit(): void {
    this.menuItems = this.rolePermission.getMenuPermission();

    this.crudPerms = {
      create: this.menuItems[2].items[1].create,
      update: this.menuItems[2].items[1].update,
      delete: this.menuItems[2].items[1].delete,
    };
    this.itemsbreadcrumb = [
      { name: "Accueil", path: "/administration/dasboard" },
      { name: "Boutique", path: "/administration/dasboard" },
      { name: "Bannière", path: "/administration/dasboard" },
    ];
  }

}

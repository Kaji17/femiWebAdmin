import { Component, OnInit } from '@angular/core';
import { RolePermissionsService } from 'src/app/shared/services/role-permissions.service';

@Component({
  selector: 'app-gestion-disposition',
  templateUrl: './gestion-disposition.component.html',
  styleUrls: ['./gestion-disposition.component.scss']
})
export class GestionDispositionComponent implements OnInit {

  public itemsbreadcrumb: any[]
  public tittelbreadcrumb:string ='Disposition produit'

  public crudPerms: any;
  public menuItems: any[];
  constructor(
    private rolePermission: RolePermissionsService,

  ) { }

  ngOnInit(): void {
    this.menuItems = this.rolePermission.getMenuPermission();

    this.crudPerms = {
      create: this.menuItems[2].items[2].create,
      update: this.menuItems[2].items[2].update,
      delete: this.menuItems[2].items[2].delete,
    };
    this.itemsbreadcrumb = [
      { name: "Accueil", path: "/administration/dasboard" },
      { name: "Boutique", path: "/administration/dasboard" },
      { name: "Disposition produit", path: "/administration/dasboard" },
    ];
  }

}

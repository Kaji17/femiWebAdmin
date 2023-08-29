import { Component, OnInit } from '@angular/core';
import { RolePermissionsService } from 'src/app/shared/services/role-permissions.service';

@Component({
  selector: 'app-gestion-type-utilisateur',
  templateUrl: './gestion-type-utilisateur.component.html',
  styleUrls: ['./gestion-type-utilisateur.component.scss']
})
export class GestionTypeUtilisateurComponent implements OnInit {

  constructor(
    private rolePermission: RolePermissionsService,

  ) { }
  public crudPerms: any;
  public menuItems: any[];

  ngOnInit(): void {
    this.menuItems = this.rolePermission.getMenuPermission();

    this.crudPerms = {
      create: this.menuItems[5].items[1].create,
      update: this.menuItems[5].items[1].update,
      delete: this.menuItems[5].items[1].delete,
    };
  }

}

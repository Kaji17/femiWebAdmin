import { Component, OnInit } from '@angular/core';
import { RolePermissionsService } from 'src/app/shared/services/role-permissions.service';

@Component({
  selector: 'app-gestion-zone',
  templateUrl: './gestion-zone.component.html',
  styleUrls: ['./gestion-zone.component.scss']
})
export class GestionZoneComponent implements OnInit {
  public crudPerms: any;
  public menuItems: any[];
  constructor(
    private rolePermission: RolePermissionsService,

  ) { }

  ngOnInit(): void {
    this.menuItems = this.rolePermission.getMenuPermission();

    this.crudPerms = {
      create: this.menuItems[5].items[0].create,
      update: this.menuItems[5].items[0].update,
      delete: this.menuItems[5].items[0].delete,
    };
  }

}

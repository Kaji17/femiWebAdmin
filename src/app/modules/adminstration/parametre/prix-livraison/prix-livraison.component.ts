import { Component, OnInit } from '@angular/core';
import { RolePermissionsService } from 'src/app/shared/services/role-permissions.service';

@Component({
  selector: 'app-prix-livraison',
  templateUrl: './prix-livraison.component.html',
  styleUrls: ['./prix-livraison.component.scss']
})
export class PrixLivraisonComponent implements OnInit {

  public crudPerms: any;
  public menuItems: any[];
  constructor(
    private rolePermission: RolePermissionsService,

  ) { }

  ngOnInit(): void {
    this.menuItems = this.rolePermission.getMenuPermission();

    this.crudPerms = {
      create: this.menuItems[5].items[1].create,
      update: this.menuItems[5].items[1].update,
      delete: this.menuItems[5].items[1].delete,
    };
  }

}

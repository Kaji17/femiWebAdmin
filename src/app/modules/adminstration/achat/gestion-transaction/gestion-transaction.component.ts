import { Component, OnInit } from '@angular/core';
import { RolePermissionsService } from 'src/app/shared/services/role-permissions.service';

@Component({
  selector: 'app-gestion-transaction',
  templateUrl: './gestion-transaction.component.html',
  styleUrls: ['./gestion-transaction.component.scss']
})
export class GestionTransactionComponent implements OnInit {

  public infoUser: any;
  public crudPerms: any
  public menuItems: any[];

  constructor(
    private rolePermission: RolePermissionsService
  ) { 
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));

  }

  ngOnInit(): void {
    this.menuItems=this.rolePermission.getMenuPermission()

    this.crudPerms = {
      create: this.menuItems[1].items[1].create,
      update: this.menuItems[1].items[1].update,
      delete: this.menuItems[1].items[1].delete,
    };

  }

}

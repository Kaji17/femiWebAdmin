import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RolePermissionsService } from "src/app/shared/services/role-permissions.service";

@Component({
  selector: "app-gestion-commande",
  templateUrl: "./gestion-commande.component.html",
  styleUrls: ["./gestion-commande.component.scss"],
})
export class GestionCommandeComponent implements OnInit {
  public currentRoute: string;
  public itemsbreadcrumb: any[];
  public tittelbreadcrumb: string = "Commandes";
  public focus;
  public infoUser: any;
  public crudPerms: any
  public menuItems: any[];

  constructor(
    private route: ActivatedRoute,
    private rolePermission: RolePermissionsService
  ) {
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
    // this.rolePermission.setPermission(this.infoUser);
  }

  ngOnInit(): void {
    this.menuItems=this.rolePermission.getMenuPermission()

    this.currentRoute = this.route.snapshot.url.join("/administration/");
    console.log("url", this.currentRoute);
    this.itemsbreadcrumb = [
      { name: "Commandes", path: "/administration/dasboard" },
      { name: "Achat", path: "/administration/dasboard" },
    ];

    this.crudPerms = {
      create: this.menuItems[1].items[0].create,
      update: this.menuItems[1].items[0].update,
      delete: this.menuItems[1].items[0].delete,
    };

    console.log("====Crudperms", this.crudPerms)
  }

}

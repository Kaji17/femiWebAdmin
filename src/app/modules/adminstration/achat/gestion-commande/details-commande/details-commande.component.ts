import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CommandeService } from "src/app/shared/services/commande.service";
import { RolePermissionsService } from "src/app/shared/services/role-permissions.service";
import { UtilisService } from "src/app/shared/services/utilis.service";

@Component({
  selector: "app-details-commande",
  templateUrl: "./details-commande.component.html",
  styleUrls: ["./details-commande.component.scss"],
})
export class DetailsCommandeComponent implements OnInit {
  @Input() infoDaTa;
  infoUser: any;
  tempPropduit: any;
  row:any[] = []
  public menuItems: any[];
  public crudPerms: any;

  constructor(
    public activeModal: NgbActiveModal,
    private utilitisService: UtilisService,
    private rolePermission: RolePermissionsService,
    private commandeService: CommandeService
  ) {
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
    this.rolePermission.setPermission(this.infoUser);
    
  }

  ngOnInit(): void {
    console.log(this.infoDaTa);
    this.row = this.getOwnerProduit(this.infoDaTa.panierObjectList)
    console.log(this.row);
    console.log(this.infoUser);
    this.menuItems = this.rolePermission.getMenuPermission();
    this.crudPerms = {
      create: this.menuItems[1].items[0].create,
      update: this.menuItems[1].items[0].update,
      delete: this.menuItems[1].items[0].delete,
      other: this.menuItems[1].items[0].other,
    };
  }

  // Fermer le modal
  closeModal() {
    this.activeModal.close();
  }

  closeModalOk() {
    this.activeModal.close("ok");
  }

  refuserCommande() {}
  validerProduit(id, dispo:boolean) {
    
    console.log("d", id)
    this.commandeService.validerProduitCommande(this.infoDaTa.id, id, this.infoUser.body.boutique.id, dispo).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          if (data.status == 200) {
            console.log("======produit valider avec Success", d);
            // this.showNotification("success");
          } else {
            console.log("======produit n'a pas pu être valider", d);
            // this.showNotification("danger");
          }
        });
      },
    });
  }

  getOwnerProduit(tab: any[]): any[]{
    let tabOwner:any[]=[]
    tab.map((el)=>{
      if(el.produit.boutique.id == this.infoUser.body.boutique.id){
        tabOwner.push(el)
      }
    })
    return tabOwner
  }

}

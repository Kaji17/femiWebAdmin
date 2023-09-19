import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ProduitService } from "src/app/shared/services/produit.service";
import { UtilisService } from "src/app/shared/services/utilis.service";

@Component({
  selector: "app-modal-update-position-affichage",
  templateUrl: "./modal-update-position-affichage.component.html",
  styleUrls: ["./modal-update-position-affichage.component.scss"],
})
export class ModalUpdatePositionAffichageComponent implements OnInit {
  @Input() infoDaTa;
  infoUser: any;
  position: number;
  result: string;

  constructor(
    public activeModal: NgbActiveModal,
    private utilitisService: UtilisService,
    private toastr: ToastrService,
    private produitService: ProduitService
  ) {
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
  }

  ngOnInit(): void {
    this.position = this.infoDaTa.positionaffichage;
  }
  // Fermer le modal
  closeModal() {
    this.activeModal.close();
  }

  closeModalOk() {
    this.activeModal.close("ok");
  }

  handleOk() {
    console.log(
      "Infos de l'administrateur",
      this.infoDaTa.id,
      "et position: ",
      this.position
    );
    this.updatePosition(this.infoDaTa.id, this.position);
  }

  updatePosition(produitid: any, position: any) {
    this.produitService.updatePositionProduit(produitid, position).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          if (data.status == 200) {
            console.log("======Modification position réussit", d);
            this.showNotification("success");
          } else {
            console.log("======Modification position failled", d);
            this.showNotification("danger");
          }
        });
      },
    });
  }

  // Notification alerte
  showNotification(type, message?: string) {
    if (type === "default") {
      this.toastr.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Error server 505</span> <span data-notify="message">Désolé le serveur est innacsseible pour l\'instant réesayer plus tard ou contacter le service client</span></div>',
        "",
        {
          timeOut: 3000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: "alert-title",
          positionClass: "toast-top-center",
          toastClass:
            "ngx-toastr alert alert-dismissible alert-default alert-notify",
        }
      );
    }
    if (type === "danger") {
      this.toastr.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Désolé email existe déja réessayer avec une autre adresse mail</span></div>',
        "",
        {
          timeOut: 3000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: "alert-title",
          positionClass: "toast-top-center",
          toastClass:
            "ngx-toastr alert alert-dismissible alert-danger alert-notify",
        }
      );
    }
    if (type === "success") {
      this.toastr.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> Le prix de livraison à été ajouter avec succès</span></div>',
        "",
        {
          timeOut: 3000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: "alert-title",
          positionClass: "toast-top-center",
          toastClass:
            "ngx-toastr alert alert-dismissible alert-success alert-notify",
        }
      );
    }
  }
}

import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { CommandeService } from "src/app/shared/services/commande.service";
import { UtilisService } from "src/app/shared/services/utilis.service";

@Component({
  selector: "app-valider-commande",
  templateUrl: "./valider-commande.component.html",
  styleUrls: ["./valider-commande.component.scss"],
})
export class ValiderCommandeComponent implements OnInit {
  @Input() infoDaTa;
  constructor(
    public activeModal: NgbActiveModal,
    private utilitisService: UtilisService,
    private commandeService: CommandeService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    console.log("Row", this.infoDaTa);
  }

  // Fermer le modal
  closeModal() {
    this.activeModal.close();
  }

  closeModalOk() {
    this.activeModal.close("ok");
  }

  onValideCommande() {
    this.commandeService.validerCommande(this.infoDaTa.id).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          if (data.status == 200) {
            console.log("======commande valider avec Success", d);
            this.showNotification("success");
          } else {
            console.log("======la commande n'a pas pu être valider", d);
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
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Désolé nous la commande n\'a pas pu être valider réessayer</span></div>',
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
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Ngx Toastr</span> <span data-notify="message">Validation de la commande avec sucèss</span></div>',
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

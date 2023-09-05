import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PrixLivraisonService } from 'src/app/shared/services/prix-livraison.service';
import { UtilisService } from 'src/app/shared/services/utilis.service';
import { ZoneService } from 'src/app/shared/services/zone.service';

@Component({
  selector: 'app-modal-assign-zone',
  templateUrl: './modal-assign-zone.component.html',
  styleUrls: ['./modal-assign-zone.component.scss']
})
export class ModalAssignZoneComponent implements OnInit {

  @Input() infoDaTa;
  formAssignPrixLivraison: FormGroup;
  infoUser: any;
  result: string;
  // prix:number = this.infoDaTa.prix

  listZone: any[]
  configZone = {
    displayKey: "nom", //if objects array passed which key to be displayed defaults to description
    height: "300px", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Filtrer zone', // text to be displayed when no item is selected defaults to Select,
    search: true,
    searchOnKey: "nom",
    limitTo: 25,
  };

  constructor(
    public activeModal: NgbActiveModal,
    private utilitisService: UtilisService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private zoneService: ZoneService,
    private prixLivraisonService: PrixLivraisonService
  ) {
    this.getAllZone({
      pagination: false,
    });
  }

  ngOnInit(): void {
    console.log(this.infoDaTa);
    
    this.buildForm();
    // this.prix
  }
  // Fermer le modal
  closeModal() {
    this.activeModal.close();
  }

  closeModalOk() {
    this.activeModal.close("ok");
  }

  buildForm() {
    this.formAssignPrixLivraison = this.fb.group({
      id: [this.infoDaTa.id],
      zoneid: ["", [Validators.required]],
    });
  }

  handleOk() {
    this.formAssignPrixLivraison.value.zoneid = this.formAssignPrixLivraison.value.zoneid.id
    console.log("Infos de l'assignement du prix de livraison", this.formAssignPrixLivraison.value);
    this.assignPrixLivraison(this.formAssignPrixLivraison.value);
    this.closeModalOk()
  }

  assignPrixLivraison(obj: any) {
    this.prixLivraisonService.assignPrixLivraison(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          if (data.status == 200||data.status==201||data.status==204) {
            console.log("======assigner avec Success", d);
            this.showNotification("success");
          } else {
            console.log("======assigner failled", d);
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
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Désolé nous n\'avons pas pu assigner le prix de livraison à la zone</span></div>',
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
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Ngx Toastr</span> <span data-notify="message">Le prix de livraison à été assigner avec succès</span></div>',
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

    // Get all zone
    getAllZone(obj: any) {
      this.zoneService.gettAllZone(obj).subscribe({
        next: (data) => {
          this.utilitisService.response(data, (d: any) => {
            console.log(d);
            if (data.status == 200) {
              this.listZone = []
              let lis: any[] = [];
              lis = d.body;
              lis.map((el) => {
                this.listZone.push(el);
              });
              console.log("list des zones ====", this.listZone);
            }
          });
        },
        error: (error) => {
          this.utilitisService.response(error, (d: any) => {});
        },
      });
    }


}

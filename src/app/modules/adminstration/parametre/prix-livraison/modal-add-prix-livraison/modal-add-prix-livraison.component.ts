import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdministrateurService } from 'src/app/shared/services/administrateur.service';
import { PrixLivraisonService } from 'src/app/shared/services/prix-livraison.service';
import { RolePermissionsService } from 'src/app/shared/services/role-permissions.service';
import { UtilisService } from 'src/app/shared/services/utilis.service';
import { ZoneService } from 'src/app/shared/services/zone.service';

@Component({
  selector: 'app-modal-add-prix-livraison',
  templateUrl: './modal-add-prix-livraison.component.html',
  styleUrls: ['./modal-add-prix-livraison.component.scss']
})
export class ModalAddPrixLivraisonComponent implements OnInit {

  formAddPrixLivraison: FormGroup;
  infoUser: any;
  listRole: any[] = [];
  passwordConfirm: string = "";
  password: string = "";
  result: string;

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
    private rolePerms: RolePermissionsService,
    private adminService: AdministrateurService,
    private zoneService: ZoneService,
    private prixLivraisonService: PrixLivraisonService
  ) {
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
    this.getAllZone({
      pagination: false,
    });
  }

  ngOnInit(): void {
    this.getAllRole({
      boutiqueid: this.infoUser.body.boutique.id,
      pagination: false,
    });
    
    this.buildForm();
  }
  // Fermer le modal
  closeModal() {
    this.activeModal.close();
  }

  closeModalOk() {
    this.activeModal.close("ok");
  }

  buildForm() {
    this.formAddPrixLivraison = this.fb.group({
      prix: [1000, [Validators.required]],
      isdefault: [false],
      boutique: [this.infoUser.body.boutique],
    });
  }

  handleOk() {
    // this.formAddPrixLivraison.value.zoneid = this.formAddPrixLivraison.value.zoneid.id
    console.log("Infos de l'administrateur", this.formAddPrixLivraison.value);
    this.addPrixLivraison(this.formAddPrixLivraison.value);
    this.closeModalOk()
  }

  getAllRole(obj: any) {
    this.rolePerms.getAllRole(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          this.listRole = d.body;
          // this.allRole = JSON.parse(atob(d.body.content.description))
          console.log("======Liste des role", this.listRole);
        });
      },
    });
  }

  addPrixLivraison(obj: any) {
    this.prixLivraisonService.addPrixLivraison(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log("======Ajout Success", d);
          if (data.status == 200||data.status==201) {
            console.log("======Ajout Success", d);
            this.showNotification("success");
          } else if (data.status == 409) {
            console.log("======Ajout failled", d);
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
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Ngx Toastr</span> <span data-notify="message">Le prix de livraison à été ajouter avec succès</span></div>',
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

  // infoSwal(bool: boolean) {
  //   if(bool){
  //     swal({
  //       title: "Success",
  //       text: "L'utilisateur à été créer avec succès",
  //       type: "success",
  //       buttonsStyling: false,
  //       confirmButtonClass: "btn btn-success",
  //     });
  //   }else{
  //     swal({
  //       title: 'Email existante',
  //       text: "L'email existe déja réessayer en utilisant une autre adresse mail",
  //       type: 'warning',
  //       buttonsStyling: false,
  //       confirmButtonClass: 'btn btn-warning',
  //       onClose : ()=>{
  //         this.buildForm()
  //       }
  //     });
  //   }
  // }

}

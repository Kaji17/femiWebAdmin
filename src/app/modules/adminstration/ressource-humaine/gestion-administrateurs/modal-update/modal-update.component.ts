import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdministrateurService } from 'src/app/shared/services/administrateur.service';
import { RolePermissionsService } from 'src/app/shared/services/role-permissions.service';
import { UtilisService } from 'src/app/shared/services/utilis.service';

@Component({
  selector: 'app-modal-update',
  templateUrl: './modal-update.component.html',
  styleUrls: ['./modal-update.component.scss']
})
export class ModalUpdateComponent implements OnInit {

  @Input() infoDaTa;
  formUpdateAdmin: FormGroup;
  infoUser: any;
  listRole: any[] = [];

  config:any = {
    search:true,
    height: '250px',
    displayKey:"nom",
  }

  constructor(
    public activeModal: NgbActiveModal,
    private utilitisService: UtilisService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private rolePerms: RolePermissionsService,
    private adminService: AdministrateurService
  ) {
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));

   }

  ngOnInit(): void {
    console.log('-d-d-')
    this.getAllRole({
      boutiqueid: this.infoUser.body.boutique.id,
      pagination: false,
    });

    console.log('-d-d-')
    this.buildForm();
    
  }

  // Fermer le modal
  closeModal() {
    this.activeModal.close();
  }

  closeModalOk() {
    this.activeModal.close('ok');
  }

  // buildForm() {
  //   console.log('====', this.infoDaTa)
  //   let fv: any = this.infoDaTa;
  //   this.formUpdateAdmin = this.fb.group({
  //     nom: [fv&&fv.nom?fv.nom:null, Validators.required],
  //     email: [
  //       fv&&fv.email?fv.email:null,
  //       Validators.required,
  //       Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,100}$"),
  //     ],
  //     contact: [fv&&fv.contact?fv.contact:null, Validators.required, Validators.pattern(/^\w{10}$/)],
  //     role: ["", Validators.required],
  //     boutique: [this.infoUser.body.boutique]
  //   });
  // }

  buildForm() {
    console.log("d", this.infoDaTa);
    let fv: any = this.infoDaTa;
    this.formUpdateAdmin = this.fb.group({
      nom: [fv&&fv.nom?fv.nom:null,[ Validators.required]],
      email: [
        fv&&fv.email?fv.email:null,
        [Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,100}$")],
      ],
      contact: [fv&&fv.contact?fv.contact:null, [Validators.required, Validators.pattern(/^\w{10}$/)]],
      role: [fv&&fv.role.nom?fv.role.nom:null, [Validators.required]],
      boutique: [this.infoUser.body.boutique],
    });
  }

  handleOk() {
    console.log("Infos de l'administrateur", this.formUpdateAdmin.value)
    let n : number =0
    n = this.infoDaTa.id
    this.updateAdmin(n,this.formUpdateAdmin.value)
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

  updateAdmin(adminId:number,obj: any) {
    this.adminService.updateAdmin(adminId,obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          if (data.status == 200) {
            console.log("======Modification Success", d);
            this.showNotification("success");
            this.getAllRole({
              boutiqueid: this.infoUser.body.boutique.id,
              pagination: false,
            })
          }
          // this.allRole = JSON.parse(atob(d.body.content.description))
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
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Désolé nous ne pouvons pas créer ce produit vérifier les données</span></div>',
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
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> L\'administrateur à été modifié avec succès</span></div>',
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

  selectionChanged(event){
    console.log(event)
    // this.getRoles(event.value.id)
  }

}

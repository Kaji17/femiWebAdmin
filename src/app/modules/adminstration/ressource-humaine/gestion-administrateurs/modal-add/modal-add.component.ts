import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { AdministrateurService } from "src/app/shared/services/administrateur.service";
import { RolePermissionsService } from "src/app/shared/services/role-permissions.service";
import { UtilisService } from "src/app/shared/services/utilis.service";

@Component({
  selector: "app-modal-add",
  templateUrl: "./modal-add.component.html",
  styleUrls: ["./modal-add.component.scss"],
})
export class ModalAddComponent implements OnInit {
  formAddAdmin: FormGroup;
  infoUser: any;
  listRole: any[] = [];

  config = {
    // displayFn:(item: any) => { return item.hello.world; }, //to support flexible text displaying for each item
    displayKey: "nom", //if objects array passed which key to be displayed defaults to description
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: this.listRole[0], // text to be displayed when no item is selected defaults to Select,
  };
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
    this.buildForm();
    this.getAllRole({
      boutiqueid: this.infoUser.body.boutique.id,
      pagination: false,
    });
  }
  // Fermer le modal
  closeModal() {
    this.activeModal.close();
  }

  buildForm() {
    this.formAddAdmin = this.fb.group({
      nom: ["", Validators.required],
      email: [
        "",
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,100}$"),
      ],
      contact: ["", Validators.required, Validators.pattern(/^\w{10}$/)],
      motdepasse: [
        "",
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ],
      role: ["", Validators.required],
      boutique: [this.infoUser.body.boutique],
    });
  }

  handleOk() {
    console.log("Infos de l'administrateur", this.formAddAdmin.value)
    this.addAdmin(this.formAddAdmin.value)
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

  addAdmin(obj: any) {
    this.adminService.addAdmin(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          this.listRole = d.body.content;
          if (data.status == 201) {
            console.log("======Ajout Success", d);
            this.showNotification("success");
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
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Ngx Toastr</span> <span data-notify="message">L\'administrateur à été créer avec succès</span></div>',
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
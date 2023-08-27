import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { ToastrService } from "ngx-toastr";
import { NavConstants } from "src/app/constants/nav.const";
import { RolePermissionsService } from "src/app/shared/services/role-permissions.service";
import { UtilisService } from "src/app/shared/services/utilis.service";

@Component({
  selector: "app-role-modal",
  templateUrl: "./role-modal.component.html",
  styleUrls: ["./role-modal.component.scss"],
})
export class RoleModalComponent implements OnInit {
  rows = [];
  libelle: string
  infoUser:any
  loading:boolean=false

  ColumnMode = ColumnMode;
  menu: any;
  constructor(
    public activeModal: NgbActiveModal,
    private rolePerms: RolePermissionsService,
    private utilitisService: UtilisService,
    private toastr: ToastrService

  ) {
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
  }

  ngOnInit(): void {
    this.menu = NavConstants;
    this.rows =  this.menu
  }

  checkValue(event,item,module,parent?){
    if(!parent){
      console.log(event.currentTarget.checked);
      item[module]=event.currentTarget.checked
      item.items.map(el=>{
        el[module]=event.currentTarget.checked
      })
    }
    else{
      parent[module] = event.currentTarget.checked
      let litem = parent.items.find(el=>item.label==el.label)
      litem[module]=event.currentTarget.checked
    }

    console.log('le nav',this.menu)
  }

  // Fermer le modal
  closeModal() {
    this.activeModal.close();
  }

  handleOk() {
    let res :any ={};
    // res.id =  this.infoUser.body.id
    res.nom = this.libelle;
    res.boutique=this.infoUser.body.boutique

    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key: any, value: object | null) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };
    ;

    res.description = btoa(
      JSON.stringify(this.menu, getCircularReplacer())
    );
    console.log("======content", res)
    this.addRole(res)
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
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Ngx Toastr</span> <span data-notify="message">Rôle Ajouter avec succès</span></div>',
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

  addRole(obj:any){
    this.rolePerms.addRole(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          if(data.status==201)
          console.log("======CONTENT", d);
          this.showNotification("success")
        });
      },
    });
  }

}

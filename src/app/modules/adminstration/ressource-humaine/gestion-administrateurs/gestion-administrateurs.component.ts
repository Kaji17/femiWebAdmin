import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { SelectionType } from "@swimlane/ngx-datatable";
import { Subscription } from "rxjs";
import { Page } from "src/app/shared/model/paged";
import { BreadcrumbService } from "src/app/shared/services/breadcrumb.service";
import { ModalAddComponent } from "./modal-add/modal-add.component";
import { AdministrateurService } from "src/app/shared/services/administrateur.service";
import { UtilisService } from "src/app/shared/services/utilis.service";
import { ModalUpdateComponent } from "./modal-update/modal-update.component";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";
import { RolePermissionsService } from "src/app/shared/services/role-permissions.service";
import { Configurable } from "src/app/core/config";
import { ModalPhotoProfilComponent } from "../../profil/modal-photo-profil/modal-photo-profil.component";

@Component({
  selector: "app-gestion-administrateurs",
  templateUrl: "./gestion-administrateurs.component.html",
  styleUrls: ["./gestion-administrateurs.component.scss"],
})
export class GestionAdministrateursComponent implements OnInit {
  public focus;
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any[];
  closeResult: string;
  infoUser: any;
  idAdminSelect: any;
  listRole:any[]
  public crudPerms: any;
  public menuItems: any[];
  objSearch: any;


  roleselect:any
  config:any = {
    search:true,
    height: '250px',
    displayKey:"nom",
    placeholder: 'Flitrer rôle'
  }

  SelectionType = SelectionType;
  constructor(
    private modalService: NgbModal,
    private adminService: AdministrateurService,
    private utilitisService: UtilisService,
    private toastr: ToastrService,
    private rolePermission: RolePermissionsService,
    private configService: Configurable,

  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
  }

  public SuscribeAllData: Subscription;
  ngOnDestroy(): void {
    // this.SuscribeAllData.unsubscribe;
  }

  page = new Page();

  @ViewChild("dropzone", { static: true }) dropzoneElement: ElementRef;

  ngOnInit(): void {
    this.menuItems = this.rolePermission.getMenuPermission();
    this.objSearch = {
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
      boutiqueid: this.infoUser.body.boutique.id,
    };

    this.getAllRole({
      boutiqueid: this.infoUser.body.boutique.id,
      pagination: false,
    })
    this.crudPerms = {
      create: this.menuItems[5].items[1].create,
      update: this.menuItems[5].items[1].update,
      delete: this.menuItems[5].items[1].delete,
    };
    // this.setPage({ offset: 0 });
    let currentMultipleFile = undefined;
    this.getAllAdministrateur({
      boutiqueid: this.infoUser.body.boutique.id,
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
    });
    // multiple dropzone file - accepts any type of file
  }

  openPhoto() {
    const modalRef = this.modalService.open(ModalPhotoProfilComponent, {
      windowClass: "modal-mini",
      size: "sm",
      centered: true,
    });
    modalRef.result.then(
      (result) => {
        this.closeResult = "Closed with: " + result;
        console.log("yaaaa", this.closeResult);
      },
      (reason) => {
        this.closeResult = "Dismissed " + this.getDismissReason(reason);
      }
    );
    modalRef.componentInstance.infoDaTa = this.activeRow.photo;
  }
  onAddAdministrateur() {
    console.log("Ajout effectuer");
  }
  onUpdateAdministrateur() {
    console.log("modification effectuer");
  }
  onSearchAdminByName() {
    console.log("Search admin");
  }
  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }
  //   onSelect({selected}) {
  //     this.selected.splice(0, this.selected.length);
  //     this.selected.push(...selected);
  //  }
  onActivate(event) {
    this.activeRow = event.row;
    console.log("Je suis active ===", this.activeRow)
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    console.log("=====pageInfo", this.page);
    this.getAllAdministrateur({
      boutiqueid: this.infoUser.body.boutique.id,
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
    });
  }

  getImg(src: string) {
    if (src) {
      return src.replace(
        this.configService.get("imgVar"),
        this.configService.get("imgHttp")
      ) as any;
    }
  }

  onSelect({ selected }) {
    console.log("Select Event", selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    console.log("hhh", this.selected);
  }

  displayCheck(row) {
    return row.name !== "Ethel Price";
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return "with: $reason";
    }
  }

  open(content, type, modalDimension) {
    if (modalDimension === "sm" && type === "modal_mini") {
      this.modalService
        .open(content, {
          windowClass: "modal-mini",
          size: "sm",
          centered: true,
        })
        .result.then(
          (result) => {
            this.closeResult = "Closed with: " + result;
          },
          (reason) => {
            this.closeResult = "Dismissed " + this.getDismissReason(reason);
          }
        );
    } else if (modalDimension === "" && type === "Notification") {
      this.modalService
        .open(content, { windowClass: "modal-danger", centered: true })
        .result.then(
          (result) => {
            this.closeResult = "Closed with: " + result;
          },
          (reason) => {
            this.closeResult = "Dismissed " + this.getDismissReason(reason);
          }
        );
    } else {
      this.modalService.open(content, { centered: true }).result.then(
        (result) => {
          this.closeResult = "Closed with: " + result;
        },
        (reason) => {
          this.closeResult = "Dismissed " + this.getDismissReason(reason);
        }
      );
    }
  }

  // OUVRIR MODALS AJOUT ADMIN
  openAddAdmin() {
    const modalRef = this.modalService.open(ModalAddComponent, {
      windowClass: "modal-mini",
      size: "lg",
      // centered: true,
    });
    modalRef.result.then(
      (result) => {
        this.closeResult = "Closed with: " + result;
        console.log("yaaaa", this.closeResult);
        if (result == "ok") {
          this.getAllAdministrateur({
            boutiqueid: this.infoUser.body.boutique.id,
            pagination: true,
            page: 0,
            size: 10,
          });
        }
      },
      (reason) => {
        this.closeResult = "Dismissed " + this.getDismissReason(reason);
      }
    );
    // modalRef.componentInstance.infoDaTa = infoData;
  }

  // OUVRIR MODALS MODIFICATION ADMIN
  openUpdateAdmin(infoDaTa) {
    const modalRef = this.modalService.open(ModalUpdateComponent, {
      windowClass: "modal-mini",
      size: "lg",
      // centered: true,
    });
    modalRef.result.then(
      (result) => {
        this.closeResult = "Closed with: " + result;
        console.log("yaaaa", this.closeResult);
        if (result == "ok") {
          setTimeout(() => {
            this.getAllAdministrateur({
              boutiqueid: this.infoUser.body.boutique.id,
              pagination: true,
              page: this.page.pageNumber,
              size: 10,
            });
            this.selected = [];
          }, 1500);
        }
      },
      (reason) => {
        this.closeResult = "Dismissed " + this.getDismissReason(reason);
      }
    );
    modalRef.componentInstance.infoDaTa = infoDaTa;
  }
  close() {
    this.modalService.dismissAll(this.closeResult);
  }


  getAllRole(obj: any) {
    this.rolePermission.getAllRole(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          this.listRole=[]
          this.listRole = d.body;
          console.log("======CONTENT list des role", d);
        });
      },
    });
  }

  ontet() {
    console.log("vilain  ca marche pas");
  }
  @ViewChild("content", { static: true }) modalContent: TemplateRef<any>;
  private modalRef: NgbModalRef;

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  onDeleteProduit(id: number) {
    console.log("produits supprimer");
  }

  getAllAdministrateur(obj: any) {
    this.adminService.getAllAdmin(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          this.page.size = d.body.size;
          this.page.pageNumber = d.body.number;
          this.page.totalElements = d.body.totalElements;
          // this.totalPage = d.body.totalPages;
          this.temp = d.body.content;
          console.log("======CONTENT", d);
        });
      },
    });
  }

  onDeleteRow(row: any) {
    console.log("=======Row", row);
    this.idAdminSelect = row;
  }

  onDeleteAdmin(id: number) {
    this.adminService.deleteAdmin(id).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 204) {
            console.log("L'admin avec l'id:", id, " n'existe");
          } else if (data.status == 400) {
            console.log("Verifier l'id renseigner");
          } else {
            console.log("admin supprimer");
            console.log(data);
            this.showNotification("success");
            this.getAllAdministrateur({
              boutiqueid: this.infoUser.body.boutique.id,
              pagination: true,
              page: 0,
              size: 10,
            });
          }
        });
      },
    });
    console.log("produits supprimer");
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
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> L\'administrateur à été supprimer avec succès</span></div>',
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

  infoSwal(bool: boolean) {
    if (bool) {
      swal({
        title: "Success",
        text: "L'utilisateur à été créer avec succès",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
      });
    } else {
      swal({
        title: "Email existante",
        text: "L'email existe déja réessayer en utilisant une autre adresse mail",
        type: "warning",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-warning",
      });
    }
  }


  filterRole() {
    console.log("statut", this.roleselect);
    if (this.roleselect.length!=0&&this.roleselect!=undefined) {
      this.objSearch.roleid = this.roleselect.id
      console.log("obj search select", this.objSearch);
      this.getAllAdministrateur(this.objSearch);
    } else {
      console.log('twysryryrasdfakjb')
      this.objSearch.roleid =""
      console.log("obj search", this.objSearch);
      this.getAllAdministrateur(this.objSearch);
    }
  }
}

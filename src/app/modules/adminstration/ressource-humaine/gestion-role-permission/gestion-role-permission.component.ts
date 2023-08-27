import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import { Subscription } from "rxjs";
import { Page } from "src/app/shared/model/paged";
import { BreadcrumbService } from "src/app/shared/services/breadcrumb.service";
import { NavConstants } from "src/app/constants/nav.const";
import { Nav2Constants } from "src/app/constants/nav2.const";
import { NavItems, navAdminItems } from "src/app/constants/_nav";
import { FormBuilder, FormGroup } from "@angular/forms";
import { RoleModalComponent } from "./role-modal/role-modal.component";
import { RolePermissionsService } from "src/app/shared/services/role-permissions.service";
import { Configurable } from "src/app/core/config";
import { UtilisService } from "src/app/shared/services/utilis.service";
import { ToastrService } from "ngx-toastr";
import { RoleUpdateModalComponent } from "./role-update-modal/role-update-modal.component";

@Component({
  selector: "app-gestion-role-permission",
  templateUrl: "./gestion-role-permission.component.html",
  styleUrls: ["./gestion-role-permission.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class GestionRolePermissionComponent implements OnInit {
  public focus;
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any[];
  public menuItems: any[];

  closeResult: string;
  isExpandedd2: boolean = true;
  infoUser: any;
  totalPage: number;
  idRoleSelect: any;

  SelectionType = SelectionType;
  ColumnMode = ColumnMode;
  constructor(
    private service: BreadcrumbService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private rolePerms: RolePermissionsService,
    private utilitisService: UtilisService,
    private configService: Configurable,
    private toastr: ToastrService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
  }

  page = new Page();

  //
  permForm: FormGroup;
  file: any[] = [];
  cols = [
    { field: "disabled", header: "Désactiver" },
    { field: "id", header: "Full" },
    { field: "create", header: "Create" },
    { field: "update", header: "Update" },
    { field: "delete", header: "Delete" },
    { field: "other", header: "Other" },
  ];

  public SuscribeAllData: Subscription;
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    // this.setPage({ offset: 0 });
    this.menuItems = Nav2Constants;
    this.file = this.buildTableNodes(navAdminItems);
    console.log("Bonjour");
    this.getAllRole({
      boutiqueid: this.infoUser.body.boutique.id,
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
    });
  }

  // Méthode d'ajout nouvelle catégorie de  produit
  onAddCategorieProduit() {
    console.log("Ajout catégorie effectuer");
  }

  // Méthode de modification catégorie de  produit
  onUpdateCategorieProduit() {
    console.log("modification catégorie effectuer");
  }

  // Méthode de filtrage de la table
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
  }

  // Méthode d'ajout d'élément dans le tableau
  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    console.log("=====pageInfo", this.page);
    this.getAllRole({
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
      boutiqueid: this.infoUser.body.boutique.id,
    });
  }

  // Méthode d'ajout a la liste d'élément selectionner
  onSelect({ selected }) {
    console.log("Select Event", selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    console.log("hhh", this.selected);
  }

  displayCheck(row) {
    return row.name !== "Ethel Price";
  }

  // Méthode pour fermer les modals
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return "with: $reason";
    }
  }

  // Méthode pour faire apparaitre les différents modals
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
      this.modalService
        .open(RoleModalComponent, { centered: true, size: "lg" })
        .result.then(
          (result) => {
            this.closeResult = "Closed with: " + result;
          },
          (reason) => {
            this.closeResult = "Dismissed " + this.getDismissReason(reason);
          }
        );
    }
  }

  // OUVRIR MODALS EDITS IMAGES
  openAddRole() {
    const modalRef = this.modalService.open(RoleModalComponent, {
      windowClass: "modal-mini",
      size: "lg",
      // centered: true,
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
    // modalRef.componentInstance.infoDaTa = infoData;
  }

  openEditRole(infoData:any) {
    const modalRef = this.modalService.open(RoleUpdateModalComponent, {
      windowClass: "modal-mini",
      size: "lg",
      // centered: true,
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
    modalRef.componentInstance.infoDaTa = infoData;
  }

  // close() {
  //   this.modalService.dismissAll(this.closeResult);
  // }

  // ontet() {
  //   console.log("vilain  ca marche pas");
  // }

  // Méthode pour suuprimer une catégorie  de produit
  onDeleteCategorieProduit(id: number) {
    console.log("produits supprimer");
  }

  expanded: any = {};
  @ViewChild("myTable") table: any;

  toggleExpansion(index) {
    this.menuItems[index].isExpandedd2 = !this.menuItems[index].isExpandedd2;
  }

  buildTableNodes(nav: NavItems[], selectedNav?: any) {
    this.file = [];
    let retArr: any[] = [];
    //
    nav.map((menu, index) => {
      let obj: any = {};
      obj["title"] = menu.title;
      let node: any = {
        title: menu.title,
        create: false,
        update: false,
        delete: false,
        other: false,
        id: false,
      };

      if (menu.url) {
        node["url"] = menu.url;
      }

      if (menu.disabled == true || menu.disabled == false) {
        node["disabled"] = menu.disabled;
      }

      if (menu.children) {
        obj["children"] = this.buildTableNodes(menu.children);
      }

      obj["data"] = node;
      if (menu.title == "Gestion des Utilisateurs") {
      }
      retArr.push(obj);
    });
    //
    return retArr;
  }

  verif(
    val: any,
    col: string | number,
    row: any,
    subRow: { node: { children: any[] } }
  ) {
    if (subRow && subRow.node.children) {
      subRow.node.children = subRow.node.children.map((obj) => {
        obj.data[col] = val;
        console.log("=obj=", obj);
        if (obj.children) {
        }
        return obj;
      });
    }
    // this.permForm.controls['roledescription'].setValue(this.file);
  }

  // Recupere Id de la ligne selectionner a supprimer
  onDeleteRow(row: any) {
    console.log("=======Row", row);
    this.idRoleSelect = row;
  }

  getAllRole(obj: any) {
    this.rolePerms.getAllRole(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          this.page.size = d.body.size;
          this.page.pageNumber = d.body.number;
          this.page.totalElements = d.body.totalElements;
          this.totalPage = d.body.totalPages;
          this.temp = d.body.content;
          console.log("======CONTENT", d);
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
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Ngx Toastr</span> <span data-notify="message">Le Produit à été créer avec succès</span></div>',
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


  onDeleteRole(id: number) {
    this.rolePerms.deleteRole(id).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 204) {
            console.log("Le role avec l'id:", id, " n'existe");
          } else if (data.status == 400) {
            console.log("Verifier l'id renseigner");
          } else {
            console.log("produits supprimer");
            console.log(data);
            this.showNotification("success");
            this.getAllRole({
              pagination: true,
              page: 0,
              size: 10,
              boutiqueid: this.infoUser.body.boutique.id,
            });
          }
        });
      },
    });
    console.log("produits supprimer");
  }

}

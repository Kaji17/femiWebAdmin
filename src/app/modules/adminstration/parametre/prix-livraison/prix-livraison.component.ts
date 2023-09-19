import { Component, OnInit } from "@angular/core";
import { PrixLivraisonService } from "src/app/shared/services/prix-livraison.service";
import { RolePermissionsService } from "src/app/shared/services/role-permissions.service";
import { ModalAddPrixLivraisonComponent } from "./modal-add-prix-livraison/modal-add-prix-livraison.component";
import { Page } from "src/app/shared/model/paged";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { UtilisService } from "src/app/shared/services/utilis.service";
import { ModalAssignZoneComponent } from "./modal-assign-zone/modal-assign-zone.component";
import { ZoneService } from "src/app/shared/services/zone.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-prix-livraison",
  templateUrl: "./prix-livraison.component.html",
  styleUrls: ["./prix-livraison.component.scss"],
})
export class PrixLivraisonComponent implements OnInit {
  public crudPerms: any;
  public menuItems: any[];
  closeResult: string;
  listZone: any[];
  temp: any[] = [];
  tempZonePrix: any[] = [];
  infoUser: any;
  activeRow: any;
  configZone = {
    displayKey: "nom", //if objects array passed which key to be displayed defaults to description
    height: "300px", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Filtrer zone", // text to be displayed when no item is selected defaults to Select,
    search: true,
    searchOnKey: "nom",
    limitTo: 25,
  };
  page = new Page();
  page1 = new Page();

  constructor(
    private rolePermission: RolePermissionsService,
    private prixlivraisonService: PrixLivraisonService,
    private modalService: NgbModal,
    private utilitisService: UtilisService,
    private zoneService: ZoneService,
    private toastr: ToastrService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.page1.pageNumber = 0;
    this.page1.size = 10;
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
  }

  ngOnInit(): void {
    this.menuItems = this.rolePermission.getMenuPermission();

    this.crudPerms = {
      create: this.menuItems[5].items[1].create,
      update: this.menuItems[5].items[1].update,
      delete: this.menuItems[5].items[1].delete,
    };

    this.getAllPrixLivraion({
      boutiqueid: this.infoUser.body.boutique.id,
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
    });
    this.getAllZone({
      boutiqueid: this.infoUser.body.boutique.id,
      pagination: true,
      typezoneid: 2,
      page: this.page.pageNumber,
      size: this.page.size,
    });
  }

  // OUVRIR MODALS AJOUT PRIX LIVRAISON
  openAddPrixLivraison() {
    const modalRef = this.modalService.open(ModalAddPrixLivraisonComponent, {
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
            this.getAllPrixLivraion({
              boutiqueid: this.infoUser.body.boutique.id,
              pagination: true,
              page: 0,
              size: 10,
            });
          }, 1500);
        }
      },
      (reason) => {
        this.closeResult = "Dismissed " + this.getDismissReason(reason);
      }
    );
    // modalRef.componentInstance.infoDaTa = infoData;
  }

  open(content, type, modalDimension, event?: any, infoData?: any) {
    if (modalDimension === "" && type === "Notification") {
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
        .open(content, { centered: true, size: "lg" })
        .result.then(
          (result) => {
            this.closeResult = "Closed with: " + result;
          },
          (reason) => {
            this.closeResult = "Dismissed " + this.getDismissReason(reason);
          }
        );
    }
    // this.modalRef.componentInstance.infoDaTa = infoData
    // this.modalRef.result.then(()=>{
    //   console.log("yoy")
    // })
  }

  // OUVRIR MODALS ASSIGNER PRIX LIVRAISON
  openAssignPrixLivraison() {
    const modalRef = this.modalService.open(ModalAssignZoneComponent, {
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
            this.getAllPrixLivraion({
              boutiqueid: this.infoUser.body.boutique.id,
              pagination: true,
              page: 0,
              size: 10,
            });
            this.getAllZone({
              boutiqueid: this.infoUser.body.boutique.id,
              pagination: true,
              typezoneid: 2,
              page: 0,
              size: 10,
            });
          }, 1500);
        }
      },
      (reason) => {
        this.closeResult = "Dismissed " + this.getDismissReason(reason);
      }
    );
    modalRef.componentInstance.infoDaTa = this.activeRow;
  }

  // Récuperer la ligne sélectionner
  onActivate(event) {
    this.activeRow = event.row;
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    console.log("=====pageInfo", this.page);
    this.getAllPrixLivraion({
      boutiqueid: this.infoUser.body.boutique.id,
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
    });
  }
  setPage1(pageInfo) {
    this.page1.pageNumber = pageInfo.offset;
    console.log("=====pageInfo", this.page1);
    this.getAllZone({
      boutiqueid: this.infoUser.body.boutique.id,
      pagination: true,
      typezoneid: 2,
      page: this.page1.pageNumber,
      size: this.page1.size,
    });
  }

  // Récuperer toute la liste des prix de livraison
  getAllPrixLivraion(obj: any) {
    this.prixlivraisonService.gettAllPrixLivraison(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.page.size = d.body.size;
            this.page.pageNumber = d.body.number;
            this.page.totalElements = d.body.totalElements;
            // this.totalPage = d.body.totalPages;
            // this.temp = d.body.content;
            this.temp = d.body.content;
            console.log("======CONTENT commandes paginé", d);
          }
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {});
      },
    });
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

  // Get all zone
  getAllZone(obj: any) {
    this.zoneService.gettAllZone(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          this.page1.size = d.body.size;
          this.page1.pageNumber = d.body.number;
          this.page1.totalElements = d.body.totalElements;
          // this.totalPage = d.body.totalPages;
          // this.temp = d.body.content;
          this.tempZonePrix = d.body.content;
          console.log("======CONTENT commandes paginé", d);
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {});
      },
    });
  }

  onDeletePrixLivraison(id) {
    this.prixlivraisonService.deletePrixLivraison(id).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.showNotification("success");
            console.log("======CONTENT commandes paginé", d);
            this.getAllPrixLivraion({
              boutiqueid: this.infoUser.body.boutique.id,
              pagination: true,
              page: this.page.pageNumber,
              size: this.page.size,
            });
            this.getAllZone({
              boutiqueid: this.infoUser.body.boutique.id,
              pagination: true,
              typezoneid: 2,
              page: this.page1.pageNumber,
              size: this.page1.size,
            });
          }
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {});
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
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> Prix de livrison supprimer avec succès</span></div>',
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

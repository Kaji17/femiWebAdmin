import { Component, OnInit } from "@angular/core";
import { NgbModal,  ModalDismissReasons, } from "@ng-bootstrap/ng-bootstrap";
import { SelectionType } from "@swimlane/ngx-datatable";
import { ToastrService } from "ngx-toastr";
import { Configurable } from "src/app/core/config";
import { Page } from "src/app/shared/model/paged";
import { MiniBanniereService } from "src/app/shared/services/mini-banniere.service";
import { RolePermissionsService } from "src/app/shared/services/role-permissions.service";
import { UtilisService } from "src/app/shared/services/utilis.service";
import swal from "sweetalert2";
import { ModalCropperImageComponent } from "./modal-cropper-image/modal-cropper-image.component";

@Component({
  selector: "app-gestion-banniere",
  templateUrl: "./gestion-banniere.component.html",
  styleUrls: ["./gestion-banniere.component.scss"],
})
export class GestionBanniereComponent implements OnInit {
  public focus;
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any[];
  closeResult: string;
  page = new Page();

  SelectionType = SelectionType;
  public itemsbreadcrumb: any[];
  public tittelbreadcrumb: string = "Bannière";

  idMiniBannSelect: any;
  public crudPerms: any;
  public menuItems: any[];
  infoUser: any;
  last: number

  file: any;
  fileSrc: any = "";
  background: boolean;
  fileTab: any[] = [];
  fileTabSrc: any[] = [];
  constructor(
    private rolePermission: RolePermissionsService,
    private configService: Configurable,
    private miniBannService: MiniBanniereService,
    private utilitisService: UtilisService,
    private modalService: NgbModal,
    private toastr: ToastrService,

  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
  }

  ngOnInit(): void {
    this.menuItems = this.rolePermission.getMenuPermission();
    console.log("=============jfjff", this.menuItems);
    this.getAllBanniere({
      boutiqueid: this.infoUser.body.boutique.id,
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
    });
    this.crudPerms = {
      create: this.menuItems[2].items[0].create,
      update: this.menuItems[2].items[0].update,
      delete: this.menuItems[2].items[0].delete,
    };
    this.itemsbreadcrumb = [
      { name: "Accueil", path: "/administration/dasboard" },
      { name: "Boutique", path: "/administration/dasboard" },
      { name: "Bannière", path: "/administration/dasboard" },
    ];
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
  }

  // INSERER LES DONNEES DU TABLEAU
  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    console.log("=====pageInfo", this.page);
    this.getAllBanniere({
      boutiqueid: this.infoUser.body.boutique.id,
      pagination: true,
      page: 0,
      size: 0,
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



  loadFile(event: any, action?: string) {
    // let id = this.rowSelected.id;
    let reader = new FileReader();
    console.log("KK", reader);
    this.file = event.target.files[0];

    let exist: boolean = false
    this.fileTab.map((el)=>{
      console.log("nom du fichier", this.file.name)
      if(el.name == this.file.name){
        exist = true
      }
    })
    if(exist){
      console.log("fichier existe déja")
      this.showNotification("dangerExiste");
      
    }else{
    
      if (this.file.size > 51200) {
        console.log("l'image doit être < 50 Ko ");
        this.showNotification("dangerSize");
        this.file = null;
      } else {
        this.fileTab.push(this.file);
        reader.readAsDataURL(this.file);
        reader.onload = (e) => {
          this.fileSrc = reader.result as string;
          this.background = true;
          this.fileTabSrc.push(this.fileSrc);
          console.log("file", this.file);
        };
        switch (action) {
          case "add":
            console.log("add produit");
            
            // this.addMiniBanniere(this.infoUser.body.boutique.id, this.file)
            break;
          case "update":
            console.log("update produit");
            // this.UpdateMiniBanniere(this.idMiniBannSelect.id, this.file)
            break;
    
          default:
            break;
        }
        console.log("La table src", this.fileTab);
        console.log("La table", this.fileSrc);
      }}

  }

    openPhoto() {
    const modalRef = this.modalService.open(ModalCropperImageComponent, {
      windowClass: "modal-mini",
      size: "lg",
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
    // modalRef.componentInstance.infoDaTa = file;
  }


  // Recupere Id de la ligne selectionner a supprimer
  rowSelected(row: any) {
    console.log("=======Row", row);
    this.idMiniBannSelect = row;
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

  onDeleteProduit(id) {
    this.miniBannService.deleteMiniBaniere(id).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 204) {
            console.log("La banniere avec l'id:", id, " n'existe");
          } else if (data.status == 400) {
            console.log("Verifier l'id renseigner");
          } else {
            console.log("produits supprimer");
            console.log(data);
            // this.showNotification("success");
            this.getAllBanniere({
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

  getAllBanniere(obj: any) {
    this.miniBannService.gettAllMiniBaniere(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.page.size = d.body.size;
            this.page.pageNumber = d.body.number;
            this.page.totalElements = d.body.totalElements;
            this.last = d.body.totalElements;
            this.temp = d.body.content;
            console.log("======CONTENT", d);
          } else {
            console.log("erreur", d);
          }
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {});
      },
    });
  }

  addMiniBanniere(id, file) {
    this.miniBannService.addMiniBaniere(id, file).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log("======response", d);
          if (d.status == 200) {
            console.log("======response", d);
            this.getAllBanniere({
              boutiqueid: this.infoUser.body.boutique.id,
              pagination: true,
              page: 0,
              size: 10,
            });
            this.infoSwal(true);
          } else {
            this.infoSwal(false);
          }
        });
      },
    });
  }

  UpdateMiniBanniere(id, file) {
    this.miniBannService.updateMiniBaniere(id, file).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log("======response", d);
          if (d.status == 200) {
            console.log("======response", d);
            this.getAllBanniere({
              boutiqueid: this.infoUser.body.boutique.id,
              pagination: true,
              page: 0,
              size: 10,
            });
            this.infoSwalUpdate(true);
          } else {
            this.infoSwalUpdate(false);
          }
        });
      },
    });
  }

  infoSwal(bool: boolean) {
    if (bool) {
      swal({
        title: "Success",
        text: "Bannière ajoutée avec succès",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
      });
    } else {
      swal({
        title: "Error",
        text: "Un problème est survenu lors de l'ajout de la bannière",
        type: "warning",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-warning",
      });
    }
  }

  infoSwalUpdate(bool: boolean) {
    if (bool) {
      swal({
        title: "Success",
        text: "Position Modifié avec succès",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
      });
    } else {
      swal({
        title: "Error",
        text: "Un problème est survenu lors de la modification de position de la bannière",
        type: "warning",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-warning",
      });
    }
  }

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
    if (type === "dangerSize") {
      this.toastr.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">La taille de l\'image est suppérieur à 50 Ko</span></div>',
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
    if (type === "dangerExiste") {
      this.toastr.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">L\'image a été déja chargé</span></div>',
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
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> L\'image a été avec succès</span></div>',
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return "with: $reason";
    }
  }

  positionUp(pos){
    console.log("pospospos",this.idMiniBannSelect.id)
    this.configurePostion({
      id: this.idMiniBannSelect.id,
      newposition: pos-1
    })
  }
  positionDown(pos){
    console.log("pospospos",this.idMiniBannSelect.id)
    this.configurePostion({
      id: this.idMiniBannSelect.id,
      newposition: pos+1
    })
  }

  configurePostion(obj:any){
    this.miniBannService.getConfigMiniBaniere(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log("======response", d);
          if (d.status == 200) {
            console.log("======response", d);
            this.getAllBanniere({
              boutiqueid: this.infoUser.body.boutique.id,
              pagination: true,
              page: 0,
              size: 10,
            });
            this.infoSwalUpdate(true);
          } else {
            this.infoSwalUpdate(false);
          }
        });
      },
    });
  }
}

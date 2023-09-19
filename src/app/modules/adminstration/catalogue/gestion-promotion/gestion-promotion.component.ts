import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SelectionType } from "@swimlane/ngx-datatable";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { Page } from "src/app/shared/model/paged";
import { BreadcrumbService } from "src/app/shared/services/breadcrumb.service";
import { PromotionService } from "src/app/shared/services/promotion.service";
import { RolePermissionsService } from "src/app/shared/services/role-permissions.service";
import { UtilisService } from "src/app/shared/services/utilis.service";
import swal from "sweetalert2";

@Component({
  selector: "app-gestion-promotion",
  templateUrl: "./gestion-promotion.component.html",
  styleUrls: ["./gestion-promotion.component.scss"],
})
export class GestionPromotionComponent implements OnInit, OnDestroy {
  public focus;
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any[];
  bsValue;
  public dateDebut: string;
  public dateFin: string;
  infoUser: any;
  public formAddPromotion: FormGroup;
  public formUpdatePromotion: FormGroup;
  rowSelected: any;
  file: any;
  fileSrc: any = "";
  background: boolean;
  fileTab: any[] = [];
  fileTabSrc: any[] = [];
  listPromotion: any[] = [];
  mindate: string=this.formatDateForDatePick(new Date());
  mindateUp: string;
  dateDebutUp:any

  dateDebutpic

  public crudPerms: any;
  public menuItems: any[];

  closeResult: string;

  config:any = {
    search:true,
    height: '250px',
    displayKey:"nom",
  }

  idPromotionSelect: any;
  dateDebutUpdate

  SelectionType = SelectionType;
  constructor(
    private modalService: NgbModal,
    private promotionService: PromotionService,
    private utilitisService: UtilisService,
    private toastr: ToastrService,
    private rolePermission: RolePermissionsService,
    private fb: FormBuilder
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
    this.getAllTypePromotion();
  }

  page = new Page();
  public SuscribeAllData: Subscription;
  ngOnDestroy(): void {
    // this.SuscribeAllData.unsubscribe;
  }

  ngOnInit(): void {
    this.mindate = this.formatDateForDatePick(new Date());
    // this.mindateUp=this.formatDateForDatePick(new Date(this.rowSelected.datedebut))
    console.log("date", this.formatDateForDatePick(new Date()));
    this.menuItems = this.rolePermission.getMenuPermission();

    console.log("Type Promo", this.listPromotion);
    this.buildForm();
    this.crudPerms = {
      create: this.menuItems[3].items[0].create,
      update: this.menuItems[3].items[0].update,
      delete: this.menuItems[3].items[0].delete,
    };

    this.getAllPromotion({
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
      isActive: false,
      boutiqueid: this.infoUser.body.boutique.id,
    });
  }

  // BUild Form Ajout promotion
  buildForm() {
    this.formAddPromotion = this.fb.group({
      nom: ["", [Validators.required]],
      pourcentage: [[Validators.required]],
      datedebut: ["", [Validators.required]],
      datefin: ["", [Validators.required]],
      typepromotionid: ["", [Validators.required]],
      boutiqueid: [this.infoUser.body.boutique.id, [Validators.required]],
    });
  }

  // BUild Form Ajout promotion
  buildFormUpdate() {
    let data: any = {};
    data = this.rowSelected;

    this.formUpdatePromotion = this.fb.group({
      nom: [data && data.nom ? data.nom : null, [Validators.required]],
      pourcentage: [data && data.pourcentage ? data.pourcentage : null,[Validators.required]],
      datedebut: [
        data && data.datedebut ? this.formatDateForDatePick(new Date(data.datedebut)) : null,
        [Validators.required],
      ],
      datefin: [
        data && data.datefin ? this.formatDateForDatePick(new Date(data.datefin)) : null,
        [Validators.required],
      ],
      typepromotionid: [data && data.typepromotion.nom ? data.typepromotion.nom : "", [Validators.required]],
      boutiqueid: [this.infoUser.body.boutique.id, [Validators.required]],
    });
  }

  // Charger les images
  loadFile(event: any) {
    // let id = this.rowSelected.id;
    let reader = new FileReader();
    console.log("KK", reader);
    this.file = event.target.files[0];

    this.fileTab.push(this.file);
    reader.readAsDataURL(this.file);
    reader.onload = (e) => {
      this.fileSrc = reader.result as string;
      this.background = true;
      this.fileTabSrc.push(this.fileSrc);
      console.log("e", e);
    };
    console.log("La table src", this.fileTab);
    console.log("La table", this.fileSrc);
  }

  removeImg(image) {
    this.fileTabSrc = this.fileTabSrc.filter((chaine) => chaine !== image);
    console.log("======tab after del", this.fileTabSrc);
  }

  // Méthode d'ajout nouvelle catégorie de  produit
  onAddPromotion() {
    console.log("Ajout promtion effectuer");
  }

  // Méthode de modification catégorie de  produit
  onUpdatePromotion() {
    console.log("modification promtion effectuer");
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

  onActivate(event) {
    this.activeRow = event.row;
  }

  // INSERER LES DONNEES DU TABLEAU
  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    console.log("=====pageInfo", this.page);
    this.getAllPromotion({
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
      isActive: false,
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

  // onDeletePromotion(id: number) {
  //   console.log("produits supprimer");
  // }

  // GET ALL PRODUIT
  getAllPromotion(obj: any) {
    this.promotionService.gettAllPromotion(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.page.size = d.body.size;
            this.page.pageNumber = d.body.number;
            this.page.totalElements = d.body.totalElements;
            // this.totalPage = d.body.totalPages;
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

  // GET ALL PRODUIT
  getAllTypePromotion() {
    this.promotionService.gettAllTypePromotion().subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.listPromotion = d.body;
            console.log("Type Promo", this.listPromotion);
          }
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {});
      },
    });
  }

  addPromotion(obj: any, file?: any) {
    this.promotionService.addPromotion(obj, file).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log("======response", d);
          if (d.status == 201) {
            console.log("======response", d);
            this.getAllPromotion({
              pagination: true,
              page: this.page.pageNumber,
              size: this.page.size,
              isActive: false,
              boutiqueid: this.infoUser.body.boutique.id,
            });
            this.infoSwal(true);
          } else {
            this.infoSwal(false);
          }
        });
      },
    });
  }

  updatePromotion(id: number, obj: any, file?: any) {
    this.promotionService.updatePromotion(id, obj, file).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log("======response", d);
          if (d.status == 200) {
            console.log("======response promotion modifier", d);
            this.getAllPromotion({
              pagination: true,
              page: this.page.pageNumber,
              size: this.page.size,
              isActive: false,
              boutiqueid: this.infoUser.body.boutique.id,
            });
            this.infoSwal1(true);
          } else {
            this.infoSwal1(false);
          }
        });
      },
    });
  }

  // VALIDER AJOUT PRODUIT
  handleOk() {
    this.formAddPromotion.value.typepromotionid =
      this.formAddPromotion.value.typepromotionid.id;
    console.log("========res", this.formAddPromotion.value);
    console.log("===== file pour la promo", this.file);

    const originalDate = new Date(this.formAddPromotion.value.datedebut);
    this.formAddPromotion.value.datedebut = this.formatDate(originalDate)

    const originalDateFin = new Date(this.formAddPromotion.value.datefin);
    this.formAddPromotion.value.datefin = this.formatDate(originalDateFin)

    console.log("=====Date Debut", this.formAddPromotion.value.datedebut);
    console.log("=====Date Fin", this.formAddPromotion.value.datefin);

    this.addPromotion(this.formAddPromotion.value);
    this.getAllPromotion({
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
      isActive: false,
      boutiqueid: this.infoUser.body.boutique.id,
    });
    this.fileTabSrc = [];
    this.fileTab = [];
    this.file = {};
  }

  // VALIDER AJOUT PRODUIT
  handleOk1() {
    this.formUpdatePromotion.value.typepromotionid =
      this.formUpdatePromotion.value.typepromotionid.id;
    console.log("========res", this.formUpdatePromotion.value);
    console.log("===== file pour la promo", this.file);

    const originalDate = new Date(this.formUpdatePromotion.value.datedebut);
    this.formUpdatePromotion.value.datedebut = `${originalDate.getFullYear()}-${(
      originalDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${originalDate
      .getDate()
      .toString()
      .padStart(
        2,
        "0"
      )} ${originalDate.getHours()}:${originalDate.getMinutes()}:${originalDate.getSeconds()}.${originalDate
      .getMilliseconds()
      .toString()
      .padStart(3, "0")}`;

    const originalDateFin = new Date(this.formUpdatePromotion.value.datefin);
    this.formUpdatePromotion.value.datefin = `${originalDateFin.getFullYear()}-${(
      originalDateFin.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${originalDateFin
      .getDate()
      .toString()
      .padStart(
        2,
        "0"
      )} ${originalDateFin.getHours()}:${originalDateFin.getMinutes()}:${originalDateFin.getSeconds()}.${originalDateFin
      .getMilliseconds()
      .toString()
      .padStart(3, "0")}`;

    console.log("=====Date Debut", this.formUpdatePromotion.value.datedebut);
    console.log("=====Date Fin", this.formUpdatePromotion.value.datefin);

    this.updatePromotion(this.rowSelected.id, this.formUpdatePromotion.value);
    this.fileTabSrc = [];
    this.fileTab = [];
    this.file = {};
  }

  infoSwal(bool: boolean) {
    if (bool) {
      swal({
        title: "Success",
        text: "Promotion ajoutée avec succès",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
      });
    } else {
      swal({
        title: "Error",
        text: "Un problème est survenu lors de l'ajout de la promotion",
        type: "warning",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-warning",
        onClose: () => {
          this.buildForm();
        },
      });
    }
  }
  infoSwal1(bool: boolean) {
    if (bool) {
      swal({
        title: "Success",
        text: "Promotion modifier avec succès",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
      });
    } else {
      swal({
        title: "Error",
        text: "Un problème est survenu lors de la modification de la promotion",
        type: "warning",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-warning",
        onClose: () => {
          this.buildForm();
        },
      });
    }
  }

  // Recupere Id de la ligne selectionner a supprimer
  onDeleteRow(row: any) {
    console.log("=======Row", row);
    this.idPromotionSelect = row;
  }

  onDeletePromotion(id: number) {
    this.promotionService.deletePromotion(id).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 204) {
            console.log("La promotion avec l'id:", id, " n'existe pas");
          } else if (data.status == 400) {
            console.log("Verifier l'id renseigner");
          } else {
            console.log("promotion supprimer");
            console.log(data);
            this.showNotification("success");
            this.getAllPromotion({
              pagination: true,
              page: this.page.pageNumber,
              size: this.page.size,
              isActive: false,
              boutiqueid: this.infoUser.body.boutique.id,
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
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> La promotion à été supprimer avec succès</span></div>',
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

  // Recupere Id de la ligne selectionner a supprimer
  onUpdateRow(row: any) {
    console.log("=======RowFOrUpdate", row);
    this.rowSelected = row;
    // this.getImageByProduitId(n)
    this.buildFormUpdate();
  }

  formatDate(date:any) {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date
      .getDate()
      .toString()
      .padStart(
        2,
        "0"
      )} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date
      .getMilliseconds()
      .toString()
      .padStart(3, "0")}`;

  }

  formatDateForDatePick(date:any) {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date
      .getDate()
      .toString()
      .padStart(
        2,
        "0"
      )}`;

  }

  selectionChanged(event){
    console.log(event)
    // this.getRoles(event.value.id)
  }
}

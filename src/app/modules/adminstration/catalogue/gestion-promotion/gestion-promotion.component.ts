import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
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
  file: any;
  fileSrc: any = "";
  background: boolean;
  fileTab: any[] = [];
  fileTabSrc: any[] = [];
  listPromotion: any[] = [];

  public crudPerms: any;
  public menuItems: any[];

  closeResult: string;

  config = {
    // displayFn:(item: any) => { return item.hello.world; }, //to support flexible text displaying for each item
    displayKey: "nom", //if objects array passed which key to be displayed defaults to description
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: this.listPromotion[0], // text to be displayed when no item is selected defaults to Select,
  };

  SelectionType = SelectionType;
  constructor(
    private service: BreadcrumbService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
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
    this.menuItems = this.rolePermission.getMenuPermission();

    console.log("Type Promo", this.listPromotion)
    this.buildForm();
    this.crudPerms = {
      create: this.menuItems[3].create,
      update: this.menuItems[3].update,
      delete: this.menuItems[3].delete,
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
      code: ["", [Validators.required]],
      description: [""],
      pourcentage: [0],
      datedebut: ["", [Validators.required]],
      datefin: ["", [Validators.required]],
      typepromotionid: ["", [Validators.required]],
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

  onDeletePromotion(id: number) {
    console.log("produits supprimer");
  }

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
            console.log("Type Promo", this.listPromotion)
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
          if (d.status ==201) {
            console.log("======response", d);
            this.getAllPromotion({
              pagination: true,
              page: this.page.pageNumber,
              size: this.page.size,
              isActive: false,
              boutiqueid: this.infoUser.body.boutique.id,
            });
            this.infoSwal(true)
          }else{
            this.infoSwal(false)
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
    this.formAddPromotion.value.datedebut = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1).toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours()}:${originalDate.getMinutes()}:${originalDate.getSeconds()}.${originalDate.getMilliseconds().toString().padStart(3, '0')}`;

    const originalDateFin = new Date(this.formAddPromotion.value.datefin);
    this.formAddPromotion.value.datefin = `${originalDateFin.getFullYear()}-${(originalDateFin.getMonth() + 1).toString().padStart(2, '0')}-${originalDateFin.getDate().toString().padStart(2, '0')} ${originalDateFin.getHours()}:${originalDateFin.getMinutes()}:${originalDateFin.getSeconds()}.${originalDateFin.getMilliseconds().toString().padStart(3, '0')}`;

    console.log("=====Date Debut", this.formAddPromotion.value.datedebut);
    console.log("=====Date Fin", this.formAddPromotion.value.datefin);
    
    this.addPromotion(this.formAddPromotion.value, this.file);
    this.getAllPromotion({
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
      isActive: false,
      boutiqueid: this.infoUser.body.boutique.id,
    });
    this.fileTabSrc = [];
    this.fileTab = [];
    this.file={}
  }


    infoSwal(bool: boolean) {
    if(bool){
      swal({
        title: "Success",
        text: "Promotion ajoutée avec succès",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
      });
    }else{
      swal({
        title: 'Error',
        text: "Un problème estsurvenu lors de l'ajout de la promotion",
        type: 'warning',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-warning',
        onClose : ()=>{
          this.buildForm()
        }
      });
    }
  }
}

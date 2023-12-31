import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { SelectionType } from "@swimlane/ngx-datatable";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { Configurable } from "src/app/core/config";
import { Page } from "src/app/shared/model/paged";
import { CategorieService } from "src/app/shared/services/categorie.service";
import { ImageProduitService } from "src/app/shared/services/image-produit.service";
import { ProduitService } from "src/app/shared/services/produit.service";
import { RolePermissionsService } from "src/app/shared/services/role-permissions.service";
import { UtilisService } from "src/app/shared/services/utilis.service";
import { CreateProduitComponent } from "./create-produit/create-produit.component";
import { ModalAssignPromotionComponent } from "./modal-assign-promotion/modal-assign-promotion.component";
import { ModalImagesProduitComponent } from "./modal-images-produit/modal-images-produit.component";
import { ModalRemovePromotionComponent } from "./modal-remove-promotion/modal-remove-promotion.component";
import { ModalUpdatePositionAffichageComponent } from "./modal-update-position-affichage/modal-update-position-affichage.component";
import { DetailsProduitComponent } from "./details-produit/details-produit.component";
import { ModalAddComponent } from "./modal-add/modal-add.component";
import { CommentaireProduitComponent } from "./commentaire-produit/commentaire-produit.component";
import * as FileSaver from "file-saver";

@Component({
  selector: "app-gestion-produis",
  templateUrl: "./gestion-produis.component.html",
  styleUrls: ["./gestion-produis.component.scss"],
})
export class GestionProduisComponent implements OnInit, OnDestroy {
  public focus;
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any[];
  closeResult: string;
  statutselect: any;
  objSearch: any;
  nomProduit: string;

  SelectionType = SelectionType;

  file: any;
  fileSrc: any = "";
  background: boolean;
  fileTab: any[] = [];
  fileTabSrc: any[] = [];

  fileUpdate: any;
  fileSrcUpdate: any = "";
  fileTabUpdate: any[] = [];
  fileTabSrcUpdate: any[] = [];

  fileChange: any;
  fileSrcChange: any = "";
  fileTabChange: any[] = [];
  fileTabSrcChange: any[] = [];

  categorieselect: any;

  // formAddProduit: FormGroup;
  dropdownOptions: string[] = ["Savon", "Savon", "Savon"];
  listCategorie: any[];
  infoUser: any;
  listAllProduit: any[] = [];
  listAffichage: any[] = [];
  loadingadd: boolean = false;
  loadingupdate: boolean = false;
  loadingIndicator = true;
  idProduitSelect: any;
  formUpdate: FormGroup;
  totalElementNumber: number;
  totalPage: number;

  totalElements: number;
  pageNumber: number;
  cache: any = {};
  isLoading = 0;
  public crudPerms: any;
  public menuItems: any[];
  verifiyItemPromed: any;

  rowSelected: any;

  catSelected: any;
  config: any = {
    search: true,
    height: "350px",
    displayKey: "nom",
    placeholder: "Flitrer catégorie",
  };
  config1 = {
    // displayFn:(item: any) => { return item.hello.world; }, //to support flexible text displaying for each item
    displayKey: "nom", //if objects array passed which key to be displayed defaults to description
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Flitrer catégorie", // text to be displayed when no item is selected defaults to Select,
  };

  listStatut: any[] = ["En attente", "Accepté", "Refusé", "Modifié"];
  configStatut = {
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Filtrer statut", // text to be displayed when no item is selected defaults to Select,
  };

  loadingdel: boolean = false;
  souscriptionAddproduit: Subscription;
  souscriptionDelproduit: any;
  souscriptionGetAllPromotion: any;
  tempExport: [];

  constructor(
    private modalService: NgbModal,
    private produitService: ProduitService,
    private utilitisService: UtilisService,
    private fb: FormBuilder,
    private categorieService: CategorieService,
    private toastr: ToastrService,
    private configService: Configurable,
    private imgProduit: ImageProduitService,
    private rolePermission: RolePermissionsService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
  }

  public SuscribeAllData: Subscription;
  public SuscribeAllCategorie: Subscription;
  // public SuscribeImGProduit: Subscription;
  ngOnDestroy(): void {
    this.SuscribeAllData.unsubscribe();
    this.SuscribeAllCategorie.unsubscribe();
    this.loadingadd ? this.souscriptionAddproduit.unsubscribe() : "";
    this.loadingdel ? this.souscriptionDelproduit.unsubscribe() : "";
    this.loadingupdate ? this.souscriptionGetAllPromotion.unsubscribe() : "";
    // this.SuscribeImGProduit.unsubscribe();
  }

  page = new Page();

  @ViewChild("dropzone", { static: true }) dropzoneElement: ElementRef;

  ngOnInit(): void {
    this.verifiyItemPromed = false;
    this.menuItems = this.rolePermission.getMenuPermission();
    // this.buildForm();
    this.getAllCategorie();
    this.objSearch = {
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
      boutiqueid: this.infoUser.body.boutique.id,
    };
    this.getAllProduit(this.objSearch);
    this.crudPerms = {
      create: this.menuItems[3].items[1].create,
      update: this.menuItems[3].items[1].update,
      delete: this.menuItems[3].items[1].delete,
    };
  }

  buildFormUpdate() {
    let data: any = {};
    data = this.rowSelected;
    // this.rowSelected?data=this.rowSelected:''
    this.formUpdate = this.fb.group({
      nom: [data && data.nom ? data.nom : "", [Validators.required]],
      caracteristique: [
        data && data.caracteristique ? data.caracteristique : "",
      ],
      description: [
        data && data.description ? data.description : "",
        [Validators.required],
      ],
      prix: [data && data.prix ? data.prix : 0, [Validators.required]],
      quantite: [data && data.quantite ? data.quantite : 1],
      categorieid: [
        data && data.categorie.nom ? data.categorie.nom : "",
        [Validators.required],
      ],
      boutiqueid: [this.infoUser.body.boutique.id, [Validators.required]],
    });

    console.log("======Table Pour modication", this.fileTabUpdate);
  }

  onAddProduit() {
    console.log("Ajout effectuer");
  }
  onUpdateProduit() {
    console.log("modification effectuer");
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
    this.objSearch.page = this.page.pageNumber;
    this.objSearch.size = this.page.size;
    this.getAllProduit(this.objSearch);
  }

  getImage(): string[] {
    return this.rows.map((row) => row.films);
  }

  // AJOUTER DANS UN TABLEAU LES PRODUITS SELECTIONNER
  onSelect({ selected }) {
    console.log("Select Event", selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    console.log("hhh", this.selected);
    selected[0].promotion
      ? (this.verifiyItemPromed = true)
      : (this.verifiyItemPromed = false);
    console.log("verify", this.verifiyItemPromed);
  }

  onSelect1(e) {
    console.log("Select Event", e, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(e);
    // console.log("hhh", this.selected);
    // e[0].promotion
    //   ? (this.verifiyItemPromed = true)
    //   : (this.verifiyItemPromed = false);
    // console.log("verify", this.verifiyItemPromed);
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

  // OUVRIR MODALS EDITS IMAGES
  openEditImages(infoData: any) {
    const modalRef = this.modalService.open(ModalImagesProduitComponent, {
      windowClass: "modal-mini",
      size: "sm",
      centered: true,
    });
    modalRef.result.then(
      (result) => {
        this.closeResult = "Closed with: " + result;
        console.log("yaaaa", this.closeResult);
        if (result == "ok") {
          setTimeout(() => {
            this.getAllProduit({
              pagination: true,
              page: 0,
              size: 10,
              boutiqueid: this.infoUser.body.boutique.id,
            });
            this.selected = [];
          }, 1500);
        }
      },
      (reason) => {
        this.closeResult = "Dismissed " + this.getDismissReason(reason);
      }
    );
    modalRef.componentInstance.infoDaTa = this.activeRow;
  }
  // OUVRIR MODALS EDITS IMAGES
  openUpdateAffichage(infoData: any) {
    const modalRef = this.modalService.open(
      ModalUpdatePositionAffichageComponent,
      {
        windowClass: "modal-mini",
        size: "sm",
      }
    );
    modalRef.result.then(
      (result) => {
        this.closeResult = "Closed with: " + result;
        console.log("yaaaa", this.closeResult);
        if (result == "ok") {
          setTimeout(() => {
            this.getAllProduit({
              pagination: true,
              page: 0,
              size: 10,
              boutiqueid: this.infoUser.body.boutique.id,
            });
            this.selected = [];
          }, 1500);
        }
      },
      (reason) => {
        this.closeResult = "Dismissed " + this.getDismissReason(reason);
      }
    );
    modalRef.componentInstance.infoDaTa = infoData;
  }

  // OUVRIR MODALS POUR ATTRIBUER PROMOTION
  openAssignPromotion(e?: any) {
    const modalRef = this.modalService.open(ModalAssignPromotionComponent, {
      windowClass: "modal-mini",
      size: "lg",
      centered: true,
    });
    modalRef.result.then(
      (result) => {
        this.closeResult = "Closed with: " + result;
        console.log("yaaaa", this.closeResult);
        if (result == "ok") {
          setTimeout(() => {
            this.objSearch = {
              pagination: true,
              page: 0,
              size: 10,
              boutiqueid: this.infoUser.body.boutique.id,
            };
            this.getAllProduit(this.objSearch);
            this.selected = [];
          }, 1500);
        }
      },
      (reason) => {
        this.closeResult = "Dismissed " + this.getDismissReason(reason);
      }
    );
    if (e) {
      console.log("yoyo", e);
      // this.selected.push(this.activeRow)
      modalRef.componentInstance.produitSelect = this.selected;
    } else {
      modalRef.componentInstance.produitSelect = this.selected;
    }
  }

  // OUVRIR MODALS POUR ATTRIBUER PROMOTION
  openCommentaireProduit() {
    const modalRef = this.modalService.open(CommentaireProduitComponent, {
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
    modalRef.componentInstance.produitSelect = this.activeRow;
  }

  // OUVRIR MODALS POUR ATTRIBUER PROMOTION
  openDetailProduit() {
    const modalRef = this.modalService.open(DetailsProduitComponent, {
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
    modalRef.componentInstance.produitSelect = this.activeRow;
  }

  // OUVRIR MODALS POUR ATTRIBUER PROMOTION
  openAddproduit() {
    const modalRef = this.modalService.open(ModalAddComponent, {
      windowClass: "modal-mini",
      size: "lg",
      centered: true,
    });
    modalRef.result.then(
      (result) => {
        this.closeResult = "Closed with: " + result;
        console.log("yaaaa", this.closeResult);
        if (result == "ok") {
          setTimeout(() => {
            this.objSearch = {
              pagination: true,
              page: 0,
              size: 10,
              boutiqueid: this.infoUser.body.boutique.id,
            };
            this.getAllProduit(this.objSearch);
            this.selected = [];
          }, 1500);
        }
      },
      (reason) => {
        this.closeResult = "Dismissed " + this.getDismissReason(reason);
      }
    );
    // modalRef.componentInstance.produitSelect = this.selected;
  }

  // OUVRIR MODALS POUR ATTRIBUER PROMOTION
  openRemovePromotion() {
    const modalRef = this.modalService.open(ModalRemovePromotionComponent, {
      windowClass: "modal-mini",
      size: "sm",
    });
    modalRef.result.then(
      (result) => {
        this.closeResult = "Closed with: " + result;
        console.log("yaaaa", this.closeResult);
        if (result == "ok") {
          setTimeout(() => {
            this.getAllProduit({
              pagination: true,
              page: 0,
              size: 10,
              boutiqueid: this.infoUser.body.boutique.id,
            });
            this.selected = [];
          }, 1500);
        }
      },
      (reason) => {
        this.closeResult = "Dismissed " + this.getDismissReason(reason);
      }
    );
    modalRef.componentInstance.produitSelect = this.selected;
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

  close() {
    this.modalService.dismissAll(this.closeResult);
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

  // SUPPRESSION DE PRODUIT
  onDeleteProduit(id: number) {
    this.loadingdel = true;
    this.souscriptionDelproduit = this.produitService
      .deleteProduit(id)
      .subscribe({
        next: (data) => {
          this.utilitisService.response(data, (d: any) => {
            console.log(d);
            if (data.status == 204) {
              console.log("Le produit avec l'id:", id, " n'existe");
            } else if (data.status == 400) {
              console.log("Verifier l'id renseigner");
            } else {
              console.log("produits supprimer");
              console.log(data);
              this.showNotification("success");
              this.getAllProduit({
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

  // Charger les images
  loadFile(event: any, action?: string) {
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

  // Charger les images
  loadFileUpdate(event: any) {
    console.log("donnée du tab 1", this.fileTabUpdate);

    let reader1 = new FileReader();
    console.log("Js", reader1);
    let id = this.rowSelected.id;
    console.log("Id produit", id);
    this.fileUpdate = event.target.files[0];

    this.fileTabUpdate.push(this.fileUpdate);
    console.log("donnée du tab 1 apprés ajout", this.fileTabUpdate);

    reader1.readAsDataURL(this.fileUpdate);
    reader1.onload = (e) => {
      this.fileSrcUpdate = reader1.result as string;
      console.log("e", e);

      // this.background = true;
      // this.fileTabSrc.push(this.fileSrc);
      //  this.background = "bg-[url('"+this.fileSrc+"')]"
    };

    console.log("La table que j'envoie pour l'ajout", this.fileTabUpdate);
    // this.addImageByProduitId(id, this.fileTabUpdate);
  }

  // Charger les images
  loadFileChange(event: any) {
    let id = this.rowSelected.id;
    console.log("Id produit", id);
    let reader = new FileReader();
    console.log("Changed", reader);
    this.fileChange = event.target.files[0];

    // this.fileTabChange.push(this.file);
    reader.readAsDataURL(this.fileChange);
    reader.onload = (e) => {
      this.fileSrcChange = reader.result as string;
      // this.UpdateImageByProduitId(id, { file: this.fileChange });
      this.background = true;

      this.fileTabUpdate.push(this.fileSrcChange);
      console.log("e", e);
      //  this.background = "bg-[url('"+this.fileSrc+"')]"
    };

    console.log("La table src", this.fileChange);
    console.log("La table", this.fileSrc);
  }

  deleteFile() {}

  // RECUPERER TOUTE LES CATEGORIE
  getAllCategorie() {
    this.SuscribeAllCategorie = this.categorieService
      .getAllCategorie(false)
      .subscribe({
        next: (data) => {
          this.utilitisService.response(data, (d: any) => {
            console.log(d);
            if (data.status == 200) {
              this.listCategorie = [];
              let lis: any[] = [];
              lis = d.body;
              lis.map((el) => {
                this.listCategorie.push(el);
              });
              console.log(this.listCategorie);
            }
          });
        },
        error: (error) => {
          this.utilitisService.response(error, (d: any) => {});
        },
      });
  }

  handleOk1() {
    this.formUpdate.value.categorieid = this.formUpdate.value.categorieid.id;
    console.log("========Content", this.formUpdate.value);
    console.log("=====tab de file", this.rowSelected.id);

    let obj: any = {
      produitDto: this.formUpdate.value,
    };
    this.updateProduit(this.rowSelected.id, this.formUpdate.value);
  }

  getProduitById(id) {
    this.loadingupdate = true;
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
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> Le Produit à été créer avec succès</span></div>',
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
  onDeleteRow(row: any) {
    console.log("=======Row", row);
    this.idProduitSelect = row;
  }

  // Recupere Id de la ligne selectionner a supprimer
  onUpdateRow(row: any) {
    console.log("=======RowFOrUpdate", row);
    this.rowSelected = row;
    // this.getImageByProduitId(n)
    this.buildFormUpdate();
  }

  // Recupere Id de la ligne selectionner a supprimer
  onUpdateImgRow(row: any) {
    console.log("=======RowFOrUpdate", row);
    this.rowSelected = row;
    console.log("=======RowFOrUpdateID", this.rowSelected.id);
    let n: any = {
      produitid: this.rowSelected.id,
    };
    this.getImageByProduitId(n);
    // this.buildFormUpdate();
  }

  onGetRow(row: any) {}

  getImg(src: string) {
    if (src) {
      return src.replace(
        this.configService.get("imgVar"),
        this.configService.get("imgHttp")
      ) as any;
    }
  }

  // GET ALL PRODUIT
  getAllProduit(obj: any) {
    console.log("Obgjet to search", obj);
    this.SuscribeAllData = this.produitService.gettAllProduit(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.page.size = d.body.size;
            this.page.pageNumber = d.body.number;
            this.page.totalElements = d.body.totalElements;
            this.totalPage = d.body.totalPages;
            this.temp = d.body.content;
            console.log("======CONTENT", d);
            setTimeout(() => {
              this.loadingIndicator = false;
            }, 1500);

            let lis: any[] = [];
            let lisAff: any[] = [];
            let nbr = 0;
            lis = d.body;
            this.listAllProduit = this.temp;
            this.listAllProduit.map((el) => {
              nbr = nbr + 1;
              lisAff.push(nbr);
            });
            lisAff.push(lisAff.length + 1);
            // this.listAllProduit.push(this.listAllProduit.length+1)
            lisAff.length == 0
              ? this.listAffichage.push(1)
              : (this.listAffichage = lisAff);
            console.log(this.listAffichage);
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

  onResetFile() {
    this.fileSrc = [];
    this.fileTab = [];
    this.file = {};
  }

  removeImg(image) {
    this.fileTabSrc = this.fileTabSrc.filter((chaine) => chaine !== image);
    console.log("======tab after del", this.fileTabSrc);
  }

  removeImgUpdate(image) {
    this.fileTabUpdate = this.fileTabUpdate.filter(
      (chaine) => chaine !== image
    );
    console.log("======tab after del", this.fileTabUpdate);
  }

  getImageByProduitId(id: any) {
    this.imgProduit.gettAllImgProduit(id).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log("======response ImgProduit", d);
          if (data.status == 200) {
            console.log(d.body);
            this.fileSrcUpdate = d.body;
            let tab = [];
            this.fileSrcUpdate.map((el) => {
              tab.push(this.getImg(el.url));
            });
            this.fileSrcUpdate = tab;
            console.log("======response fileSrcUpdate", this.fileSrcUpdate);
          }
        });
      },
    });
  }

  deleteImageByProduitId(id: number) {}

  // Ajout Image produit Id
  addImageByProduitId(id: number, files?: any) {
    this.imgProduit.addImgProduit(id, files).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log("======response ImgProduit", d);
          if (data.status == 201) {
            console.log(d.body);
            this.showNotification("success");
            let obj: any = {
              produitid: id,
            };
            this.getImageByProduitId(obj);
            // this.fileTabSrcUpdate = []
          }
        });
      },
    });
  }

  UpdateImageByProduitId(id: number, img: any) {
    this.imgProduit.updateImgProduit(id, img).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log("======response ImgProduit", d);
          if (data.status == 200) {
            console.log(d.body);
            this.getAllProduit({
              pagination: true,
              page: this.page.pageNumber,
              size: this.page.size,
            });
          }
        });
      },
    });
  }

  updateProduit(id: number, obj: any) {
    this.loadingupdate = true;
    this.produitService.updateProduit(id, obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log("======response ImgProduit", d);
          if (d.status == 200) {
            console.log(d.body);
            this.loadingupdate = false;
            this.getAllProduit({
              pagination: true,
              page: this.page.pageNumber,
              size: this.page.size,
              boutiqueid: this.infoUser.body.boutique.id,
            });
          }
        });
      },
    });
  }

  filterStatut() {
    console.log("statut", this.statutselect);
    if (this.statutselect) {
      this.objSearch.statut = this.statutselect;
      console.log("obj search select", this.objSearch);
      this.getAllProduit(this.objSearch);
    } else {
      this.objSearch.statut = null;
      this.getAllProduit(this.objSearch);
      console.log("obj search", this.objSearch);
    }
  }
  filterCategorie() {
    console.log("statut", this.categorieselect);
    if (this.categorieselect.length != 0 && this.categorieselect != undefined) {
      this.objSearch.categorieid = this.categorieselect.id;
      console.log("obj search select", this.objSearch);
      this.getAllProduit(this.objSearch);
    } else {
      console.log("twysryryrasdfakjb");
      this.objSearch.categorieid = "";
      console.log("obj search", this.objSearch);
      this.getAllProduit(this.objSearch);
    }
  }

  // Rechercher le nom du produit avec le input
  onsearchproduit(event) {
    if (!event) {
      this.objSearch.nom = null;
      this.getAllProduit(this.objSearch);
    } else {
      this.objSearch.nom = this.nomProduit;
      this.getAllProduit(this.objSearch);
    }
  }

  selectionChanged(event) {
    console.log(event);
    // this.getRoles(event.value.id)
  }

  getFichierProduit() {
    this.objSearch.pagination = false;
    this.produitService.gettAllProduit(this.objSearch).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.tempExport = [];
            this.tempExport = d.body;
            console.log("======CONTENT commandes paginé", d);
            this.exportExcel();
            this.objSearch.pagination = true;
            this.getAllProduit(this.objSearch);
          }
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {});
      },
    });
  }

  //EXPORTATION LISTE EN FICHIER EXCEL
  exportExcel() {
    import("xlsx").then((xlsx) => {
      // Liste
      let ledata = [];
      ledata = this.tempExport;
      console.log("data", this.tempExport);
      let dataEnv = [];
      let cpt = 1;

      let produits: string = "";
      for (let i = 0; i < ledata.length; i++) {
        ledata[i] = this.changeKeysName(ledata[i], "id", "ID");
        ledata[i] = this.changeKeysName(ledata[i], "prix", "Prix");
        ledata[i] = this.changeKeysName(
          ledata[i],
          "caracteristique",
          "Caracteristique"
        );
        ledata[i] = this.changeKeysName(
          ledata[i],
          "datecreation",
          "Date création"
        );
        ledata[i] = this.changeKeysName(
          ledata[i],
          "datevalidation",
          "Date validation"
        );
        ledata[i] = this.changeKeysName(
          ledata[i],
          "description",
          "Description"
        );
        ledata[i] = this.changeKeysName(ledata[i], "statut", "Statut");
        ledata[i] = this.changeKeysName(ledata[i], "nom", "Nom");
        ledata[i] = this.changeKeysName(
          ledata[i],
          "notemoyenne",
          "Note moyenne"
        );
        var lesimages = ledata[i].imageproduits;
        // var letypecuisine = ledata[i].typescuisines;
        if (lesimages && lesimages.length) {
          produits = "";
          for (let e = 0; e < lesimages.length; e++) {
            produits = produits + this.getImg(lesimages[e].url) + "; ";
          }
        }
        ledata[i].imageproduits = produits;
        ledata[i] = this.changeKeysName(
          ledata[i],
          "imageproduits",
          "Images produits"
        );
        ledata[i] = this.changeKeysName(ledata[i], "adresse", "Adresse");
        ledata[i] = this.changeKeysName(
          ledata[i],
          "isrecommended",
          "Récommander"
        );
        ledata[i] = this.changeKeysName(
          ledata[i],
          "positionrecommandation",
          "Position recommandation"
        );
        ledata[i] = this.changeKeysName(ledata[i], "statut", "Statut");
        ledata[i] = this.changeKeysName(ledata[i], "motifrefus", "Motif réfus");
        ledata[i].boutique = ledata[i].boutique.nom;
        ledata[i] = this.changeKeysName(ledata[i], "boutique", "Boutique");
        if (ledata[i].promotion) {
          ledata[i].promotion = ledata[i].promotion.pourcentage;
          ledata[i] = this.changeKeysName(ledata[i], "promotion", "Réduction");
        }

        if (ledata[i].typepromotion) {
          ledata[i].typepromotion = ledata[i].typepromotion.nom;
          ledata[i] = this.changeKeysName(
            ledata[i],
            "typepromotion",
            "Type promotion"
          );
        }
        ledata[i].categorie = ledata[i].categorie.nom;
        ledata[i] = this.changeKeysName(ledata[i], "categorie", "Categorie");
      }

      const worksheet = xlsx.utils.json_to_sheet(ledata);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "liste_produit");
      // this.getExport()
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  changeKeysName(test: any, OLD_KEY: any, NEW_KEY: any) {
    const { [OLD_KEY]: replaceByKey, ...rest } = test;
    const new_obj = {
      ...rest,
      [NEW_KEY]: replaceByKey,
    };

    console.log("LA LISTE TEST", new_obj);
    return new_obj;
  }
}

import {
  Component,
  ElementRef,
  OnDestroy,
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
import { Page } from "src/app/shared/model/page";
import { BreadcrumbService } from "src/app/shared/services/breadcrumb.service";
import { Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProduitService } from "src/app/shared/services/produit.service";
import { UtilisService } from "src/app/shared/services/utilis.service";
import { CategorieService } from "src/app/shared/services/categorie.service";
import { ToastrService } from "ngx-toastr";

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

  SelectionType = SelectionType;
  file: any;
  fileSrc: any = "";
  background: boolean;
  fileTab: any[] = [];
  formAddProduit: FormGroup;
  dropdownOptions: string[] = ["Savon", "Savon", "Savon"];
  listCategorie: any[] = [];
  infoUser: any;
  listAllProduit: any[] = [];
  listAffichage: any[] = [];
  loadingadd: boolean = false;
  souscriptionAddproduit: Subscription;
  idProduitSelect: any;
  formUpdate:  FormGroup
  config = {
    // displayFn:(item: any) => { return item.hello.world; }, //to support flexible text displaying for each item
    displayKey: "nom", //if objects array passed which key to be displayed defaults to description
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: this.listCategorie[0], // text to be displayed when no item is selected defaults to Select,
  };
  loadingdel: boolean = false;
  souscriptionDelproduit: any;
  constructor(
    private service: BreadcrumbService,
    private modalService: NgbModal,
    private produitService: ProduitService,
    private utilitisService: UtilisService,
    private fb: FormBuilder,
    private categorieService: CategorieService,
    private toastr: ToastrService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 20;
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
  }

  public SuscribeAllData: Subscription;
  public SuscribeAllCategorie: Subscription;
  ngOnDestroy(): void {
    this.SuscribeAllData.unsubscribe;
    this.SuscribeAllCategorie.unsubscribe;
    this.loadingadd ? this.souscriptionAddproduit.unsubscribe : "";
    this.loadingdel ? this.souscriptionDelproduit.unsubscribe : "";
  }

  page = new Page();

  @ViewChild("dropzone", { static: true }) dropzoneElement: ElementRef;

  ngOnInit(): void {
    this.setPage({ offset: 0 });
    let currentMultipleFile = undefined;
    this.buildForm();
    this.getAllCategorie();
    this.getAllProduit();
  }

  buildForm() {
    this.formAddProduit = this.fb.group({
      nom: ["", Validators.required],
      caracteristique: [""],
      datecreation: [""],
      datevalidation: [""],
      description: [""],
      enable: [false],
      notecounter: [0],
      notesum: [0],
      notemoyenne: [0],
      positionaffichage: [0],
      prix: [0],
      quantite: [1],
      statut: [""],
      selectcategorie: ["", Validators.required],
      boutique: [this.infoUser.body.boutique, Validators.required],
    });
  }

  buildFormUpdate(id: number){
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
    this.SuscribeAllData = this.service
      .getApi({ page: pageInfo.offset + 1 })
      .subscribe({
        next: (value) => {
          this.page.pageNumber = pageInfo.offset;
          this.page.size = 10;
          this.page.totalElements = value.count;
          this.page.totalPages = 9;
          console.log("Appel Api", value.results);
          this.temp = value.results;
        },
      });
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

  // OUVRIR LES MODALS
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
            }else if(data.status == 400){
              console.log("Verifier l'id renseigner");
            }else{
              console.log("produits supprimer");
              console.log(data);
              this.showNotification("success")
            }
          });
        },
      });
    console.log("produits supprimer");
  }

  // Charger les images
  loadFile(event: any) {
    let reader = new FileReader();
    console.log("KK", reader);
    this.file = event.target.files[0];

    reader.readAsDataURL(this.file);
    reader.onload = (e) => {
      this.fileSrc = reader.result as string;
      this.background = true;
      this.fileTab.push(this.fileSrc);
      console.log(this.fileTab);
      console.log("e", e);
      //  this.background = "bg-[url('"+this.fileSrc+"')]"
    };
    // let litem = parent.items.find(el=>item.label==el.label)
    console.log("La table", this.fileTab);
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
              // this.listCategorie = data.body
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

  // VALIDER AJOUT PRODUIT
  handleOk() {
    this.formAddProduit.value.files = this.fileTab;
    console.log("========res", this.formAddProduit.value);
    this.addproduit(this.formAddProduit.value, this.formAddProduit.value.files);
  }

  // RECUPERER TOUTE LES PRODUITS
  getAllProduit() {
    this.SuscribeAllCategorie = this.produitService
      .gettAllProduit(false, this.infoUser.body.boutique.id)
      .subscribe({
        next: (data) => {
          this.utilitisService.response(data, (d: any) => {
            console.log(d);
            if (data.status == 200) {
              // this.listCategorie = data.body
              let lis: any[] = [];
              let lisAff: any[] = [];
              let nbr = 0;
              lis = d.body;
              this.listAllProduit = lis;
              this.listAllProduit.map((el) => {
                nbr = nbr + 1;
                lisAff.push(nbr);
              });
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

  getProduitById(id){

  }


  // AJOUTER UN PRODUIT
  addproduit(obj, file?: any[]) {
    this.loadingadd = true;
    this.souscriptionAddproduit = this.produitService
      .addProduit(obj, file)
      .subscribe({
        next: (data) => {
          this.utilitisService.response(data, (d: any) => {
            this.loadingadd = false;
            console.log(d);
            if (d.status == 200) {
              this.showNotification("success");
            }
          });
        },
        error: (error) => {
          this.utilitisService.response(error, (d: any) => {
            this.loadingadd = false;
            console.log(d);
            if (d.status == 400) {
              this.showNotification("danger");
            } else {
              this.showNotification("danger");
            }
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

  // Recupere Id de la ligne selectionner
  onDeleteRow(row: any) {
    console.log("=======Row", row);
    this.idProduitSelect = row;
  }

  onGetRow(row: any){

  }
}

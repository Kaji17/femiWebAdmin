import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { CategorieService } from "src/app/shared/services/categorie.service";
import { ProduitService } from "src/app/shared/services/produit.service";
import { UtilisService } from "src/app/shared/services/utilis.service";

@Component({
  selector: "app-modal-add",
  templateUrl: "./modal-add.component.html",
  styleUrls: ["./modal-add.component.scss"],
})
export class ModalAddComponent implements OnInit, OnDestroy {
  formAddProduit: FormGroup;
  infoUser: any;
  listCategorie: any[];
  file: any;
  fileSrc: any = "";
  background: boolean;
  fileTab: any[] = [];
  fileTabSrc: any[] = [];
  loading: boolean = false;
  catSelected: any;
  config: any = {
    search: true,
    height: "250px",
    displayKey: "nom",
  };
  suscriptionCategorie: Subscription
  suscriptionAddProduct: Subscription
  suscriptionAddProductbool: boolean = false


  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private categorieService: CategorieService,
    private utilitisService: UtilisService,
    private toastr: ToastrService,
    private produitService: ProduitService
  ) {
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
  }
  ngOnDestroy(): void {
    this.suscriptionCategorie.unsubscribe()
    this.suscriptionAddProductbool?this.suscriptionAddProduct.unsubscribe():''
    
  }

  ngOnInit(): void {
    this.getAllCategorie();
    this.buildForm();
  }

  // Fermer le modal
  closeModal() {
    this.activeModal.close();
  }
  // Fermer le modal
  closeModalOk() {
    if (this.loading) {
      this.activeModal.close("ok");
    }
  }

  buildForm() {
    this.formAddProduit = this.fb.group({
      nom: ["", [Validators.required]],
      caracteristique: [""],
      description: ["", [Validators.required]],
      prix: ["", [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
      quantite: [1],
      categorieid: ["", [Validators.required]],
      boutiqueid: [this.infoUser.body.boutique.id, [Validators.required]],
    });
  }

  // VALIDER AJOUT PRODUIT
  handleOk() {
    this.formAddProduit.value.categorieid =
      this.formAddProduit.value.categorieid.id;
    this.formAddProduit.value.prix = parseInt(this.formAddProduit.value.prix);
    console.log("========res", this.formAddProduit.value);
    console.log("=====tab de file", this.fileTab);
    this.addproduit(this.formAddProduit.value, this.fileTab);
    this.fileTabSrc = [];
    this.fileTab = [];
  }

  // RECUPERER TOUTE LES CATEGORIE
  getAllCategorie() {
    this.suscriptionCategorie= this.categorieService.getAllCategorie(false).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            // this.listCategorie = data.body
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

  // Charger les images
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
        if (e.total > 51200) {
        } else {
          let obj:any={
            name: this.file.name,
            data: this.fileSrc
          }
          this.fileTabSrc.push(obj);
        }

        console.log("e", e);
      };
      console.log("La table src", this.fileTab);
      console.log("La table", this.fileSrc);
    }}
    // this.tabEmpty=false
  }

  removeImg(image) {
    // this.fileTab = this.fileTab.filter((chaine) => chaine !== image);
    let i= this.fileTab.indexOf(image)
    this.fileTab.map((el)=>{
      if(el.name ==image){
        console.log('index',i)
        this.fileTab.splice(i,1)
        this.fileTabSrc.splice(i,1)
      }
    })
    console.log("======tab after del", image);
  }

  // AJOUTER UN PRODUIT
  addproduit(obj, file?: any[]) {
    this.loading = true;
    this.suscriptionAddProductbool = true
    this.suscriptionAddProduct= 
    this.produitService.addProduit(obj, file).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (d.status == 201) {
            this.loading = false;
            this.showNotification("success");
            this.buildForm();
            this.fileTab = [];
            this.activeModal.close("ok");
            // this.getAllProduit({
            //   pagination: true,
            //   page: 0,
            //   size: 10,
            // });
          }else{
            this.loading = false;
            this.showNotification("danger");
            this.buildForm();
            this.fileTab = [];
            this.fileTabSrc = []
          }
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {
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
  selectionChanged(event) {
    console.log(event);
    console.log(this.catSelected.length);
    // console.log(this.boutSelected.length)
  }
}

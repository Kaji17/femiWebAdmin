import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Configurable } from "src/app/core/config";
import { ImageProduitService } from "src/app/shared/services/image-produit.service";
import { UtilisService } from "src/app/shared/services/utilis.service";

@Component({
  selector: "app-modal-images-produit",
  templateUrl: "./modal-images-produit.component.html",
  styleUrls: ["./modal-images-produit.component.scss"],
})
export class ModalImagesProduitComponent implements OnInit, AfterContentInit {
  constructor(
    public activeModal: NgbActiveModal,
    private imgProduit: ImageProduitService,
    private utilitisService: UtilisService,
    private configService: Configurable,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,

  ) {
    this.id = this.infoDaTa;
  }
  ngAfterContentInit(): void {
    // this.getImageByProduitId(this.infoDaTa);
  }

  @Input() infoDaTa: any;
  id: number;
  fileUpdate: any;
  fileSrcUpdate: any = "";
  fileTabUpdate: any[] = [];
  fileTabSrcUpdate: any[] = [];

  file: any;
  fileSrc: any = "";
  background: boolean;
  fileTab: any[] = [];
  fileTabSrc: any[] = [];

  ngOnInit(): void {
    console.log("modal", this.infoDaTa);
    this.getImageByProduitId({ produitid: this.infoDaTa.id });
  }

  // Fermer le modal
  closeModal() {
    this.activeModal.close();
  }

  // Charger les images
  // loadFileUpdate(event: any) {
  //   console.log("donnée du tab 1", this.fileTabUpdate);

  //   let reader1 = new FileReader();
  //   console.log("Js", reader1);
  //   let id = this.infoDaTa.id;
  //   console.log("Id produit", id);
  //   this.fileUpdate = event.target.files[0];

  //   this.fileTabUpdate.push(this.fileUpdate);
  //   console.log("donnée du tab 1 apprés ajout", this.fileTabUpdate);

  //   console.log("reader1", reader1);

  //   reader1.onload = (e) => {
  //     this.fileSrcUpdate = reader1.result as string;
  //     console.log("e", e);
  //   };
  //   reader1.readAsDataURL(this.fileUpdate);

  //   console.log("La table que j'envoie pour l'ajout", this.fileTabUpdate);
  // }

  loadFile(event: any, action?: string, image?:any) {
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
            this.addImageProduit(this.infoDaTa.id, this.fileTab)
            break;
          case "update":
            console.log("update produit");
            this.updateImageProduit(image.id, this.file)
            break;
    
          default:
            break;
        }
        console.log("La table src", this.fileTab);
        console.log("La table", this.fileSrc);
      }}

    
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
            // this.fileSrcUpdate.map((el) => {
            //   tab.push(this.getImg(el.url));
            // });
            // this.fileSrcUpdate = tab;
            console.log("======response fileSrcUpdate", this.fileSrcUpdate);
          }
        });
      },
    });
  }

  onDelete(id) {
    console.log("cccc", id);
    this.imgProduit.deleteImgProduit(id).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          if (data.status == 200) {
            console.log("======image supprimer avec  success");
            this.getImageByProduitId({ produitid: this.infoDaTa.id })
          }
        });
      },
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

  // AJOUTER DES IMAGES DE PRODUIT
  addImageProduit(produitId, file){
    this.imgProduit.addImgProduit(produitId, file).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (d.status == 201) {
            console.log("image ajouter avec succès ")
            this.showNotification("success")
            this.getImageByProduitId({ produitid: this.infoDaTa.id })
            this.fileTab=[]
          }
        });
      },
    })
  }

  updateImageProduit(produitId, file){
    this.imgProduit.updateImgProduit(produitId, file).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (d.status == 200) {
            console.log("image ajouter avec succès ")
            this.showNotification("success")
            this.getImageByProduitId({ produitid: this.infoDaTa.id })
            this.fileTab=[]
          }
        });
      },
    })
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
}

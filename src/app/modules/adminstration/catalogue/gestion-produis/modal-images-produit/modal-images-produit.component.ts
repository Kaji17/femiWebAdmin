import { AfterContentInit, ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
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
    private cdr: ChangeDetectorRef
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

  ngOnInit(): void {
    console.log("modal", this.infoDaTa);
    this.getImageByProduitId({produitid:this.infoDaTa.id})
  }

  // Fermer le modal
  closeModal() {
    this.activeModal.close();
  }

  // Charger les images
  loadFileUpdate(event: any) {
    console.log("donnée du tab 1", this.fileTabUpdate);

    let reader1 = new FileReader();
    console.log("Js", reader1);
    let id = this.infoDaTa.id;
    console.log("Id produit", id);
    this.fileUpdate = event.target.files[0];

    this.fileTabUpdate.push(this.fileUpdate);
    console.log("donnée du tab 1 apprés ajout", this.fileTabUpdate);

    reader1.readAsDataURL(this.fileUpdate);
    console.log("reader1", reader1);

    reader1.onload = (e) => {
      this.fileSrcUpdate = reader1.result as string;
      console.log("e", e);
    };

    console.log("La table que j'envoie pour l'ajout", this.fileTabUpdate);
    // this.addImageByProduitId(id, this.fileTabUpdate);
    // this.cdr.detectChanges();
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

  onDelete(id){
    console.log('cccc', id)
  }

  getImg(src: string) {
    if (src) {
      return src.replace(
        this.configService.get("imgVar"),
        this.configService.get("imgHttp")
      ) as any;
    }
  }
}

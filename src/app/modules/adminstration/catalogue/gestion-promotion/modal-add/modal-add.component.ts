import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Configurable } from "src/app/core/config";
import { ImageProduitService } from "src/app/shared/services/image-produit.service";
import { UtilisService } from "src/app/shared/services/utilis.service";

@Component({
  selector: "app-modal-add",
  templateUrl: "./modal-add.component.html",
  styleUrls: ["./modal-add.component.scss"],
})
export class ModalAddComponent implements OnInit {


  public formPromotion: FormGroup

  constructor(
    public activeModal: NgbActiveModal,
    private imgProduit: ImageProduitService,
    private utilitisService: UtilisService,
    private configService: Configurable,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm()
  }


  buildForm(){
    this.formPromotion= this.fb.group({

    })
  }

  // Fermer le modal
  closeModal() {
    this.activeModal.close();
  }

  getImg(src: string) {
    if (src) {
      return src.replace(
        this.configService.get("imgVar"),
        this.configService.get("imgHttp")
      ) as any;
    }
  }

  handleOk(){

  }
}

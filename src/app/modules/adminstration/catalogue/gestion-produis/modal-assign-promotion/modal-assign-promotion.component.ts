import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NgbActiveModal, NgbModal
} from "@ng-bootstrap/ng-bootstrap";
import { PromotionService } from "src/app/shared/services/promotion.service";
import { UtilisService } from "src/app/shared/services/utilis.service";
import swal from "sweetalert2";

@Component({
  selector: "app-modal-assign-promotion",
  templateUrl: "./modal-assign-promotion.component.html",
  styleUrls: ["./modal-assign-promotion.component.scss"],
})
export class ModalAssignPromotionComponent implements OnInit {
  @Input() produitSelect: any[] = [];

  itemselected: number;
  listPromotions: any[] = [];
  infoUser: any;

  file: any;
  fileSrc: any = "";
  background: boolean;
  fileTab: any[] = [];
  fileTabSrc: any[] = [];
  listTypePromotion: any[] = [];
  public formAddPromotion: FormGroup;
  public formAssignPromo: FormGroup;
  i:any
  closeResult:any

  config = {
    // displayFn:(item: any) => { return item.hello.world; }, //to support flexible text displaying for each item
    displayKey: "nom", //if objects array passed which key to be displayed defaults to description
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: this.listPromotions[0], // text to be displayed when no item is selected defaults to Select,
  };
  constructor(
    public activeModal: NgbActiveModal,
    private promotionService: PromotionService,
    private utilitisService: UtilisService,
    private fb: FormBuilder,
    private modalService: NgbModal,

  ) {
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
    this.getAllTypePromotion();
  }

  ngOnInit(): void {
    this.itemselected = 2;
   
    // this.buildForm();
    this.buildFormAssign();
    this.getAllPromotion({
      isActive: false,
      boutiqueid: this.infoUser.body.boutique.id,
      pagination: false,
    });
    console.log("----", this.produitSelect);
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
      typepromotionid: ["",[Validators.required]],
      boutiqueid: [this.infoUser.body.boutique.id, [Validators.required]],
    });
  }

  // BUild Form Ajout promotion
  buildFormAssign() {
    this.formAssignPromo = this.fb.group({
      promotionid: ["", [Validators.required]],
    });
  }

  // Fermer le modal
  closeModal() {
    this.activeModal.close();
  }
  closeModalOk() {
    this.activeModal.close("ok");
  }
  removeImg(image) {
    this.fileTabSrc = this.fileTabSrc.filter((chaine) => chaine !== image);
    console.log("======tab after del", this.fileTabSrc);
  }


  onAddNewPromotionShow(nbr: number) {
    this.itemselected = nbr;
  }

  getAllPromotion(obj: any) {
    this.promotionService.gettAllPromotion(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.listPromotions = d.body;
            console.log("Liste Promotion Promo", this.listPromotions);
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
            this.listTypePromotion = d.body;
            console.log("Type Promo", this.listTypePromotion);
          }
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {});
      },
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

  // VALIDER AJOUT PRODUIT
  handleOk() {
    this.formAddPromotion.value.typepromotionid =
      this.formAddPromotion.value.typepromotionid.id;
    console.log("========res", this.formAddPromotion.value);
    console.log("===== file pour la promo", this.file);

    const originalDate = new Date(this.formAddPromotion.value.datedebut);
    this.formAddPromotion.value.datedebut = `${originalDate.getFullYear()}-${(
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

    const originalDateFin = new Date(this.formAddPromotion.value.datefin);
    this.formAddPromotion.value.datefin = `${originalDateFin.getFullYear()}-${(
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

    console.log("=====Date Debut", this.formAddPromotion.value.datedebut);
    console.log("=====Date Fin", this.formAddPromotion.value.datefin);

    this.addPromotion(this.formAddPromotion.value, this.file);
    this.fileTabSrc = [];
    this.fileTab = [];
    this.file = {};
  }

  handleOk1(){
    this.produitSelect.map((el)=>{
      console.log("Id promotion", this.formAssignPromo.value.promotionid.id)
      console.log("Id produit", el.id)
      this.assignPromotion(this.formAssignPromo.value.promotionid.id, el.id)
    })
  }

  addPromotion(obj: any, file?: any) {
    this.promotionService.addPromotion(obj, file).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log("======response", d);
          if (d.status == 201) {
            console.log("======response", d);
            this.infoSwal(true);
          } else {
            this.infoSwal(false);
          }
        });
      },
    });
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
        text: "Un problème estsurvenu lors de l'ajout de la promotion",
        type: "warning",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-warning",
      });
    }
  }

  assignPromotion(promotionId: number, produitId:number){
    this.promotionService.assignPromotion(promotionId, produitId).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log("======Promotion Assigner", d);
          if (d.status == 200) {
            console.log("======response", d);
            this.infoSwal(true);
          } else {
            this.infoSwal(false);
          }
        });
      },
    });
  }

  removeProd(id){
    let index = this.produitSelect.findIndex((el)=> el.id == id)
    console.log("index du produit", index)
    this.produitSelect.splice(index, 1)
    console.log("New tab", this.produitSelect)
  }

}

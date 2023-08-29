import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PromotionService } from 'src/app/shared/services/promotion.service';
import { UtilisService } from 'src/app/shared/services/utilis.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-modal-remove-promotion',
  templateUrl: './modal-remove-promotion.component.html',
  styleUrls: ['./modal-remove-promotion.component.scss']
})
export class ModalRemovePromotionComponent implements OnInit {

  @Input() produitSelect: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private promotionService: PromotionService,
    private utilitisService: UtilisService,
  ) { }

  ngOnInit(): void {
  }

    // Fermer le modal
    closeModal() {
      this.activeModal.close();
    }
    closeModalOk() {
      this.activeModal.close("ok");
    }

    onRemovePromotion(promotionId,produitId){
      this.promotionService.removePromotion(promotionId, produitId).subscribe({
        next: (data) => {
          this.utilitisService.response(data, (d: any) => {
            console.log("======Promotion Remove", d);
            if (d.status == 200) {
              console.log("======response succes", d);
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
        text: "Promotion supprimer avec succès",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
      });
    } else {
      swal({
        title: "Error",
        text: "Un problème estsurvenu lors du rétierement de la promotion",
        type: "warning",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-warning",
      });
    }
  }

}

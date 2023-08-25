import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SelectionType } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { Page } from 'src/app/shared/model/page';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-gestion-promotion',
  templateUrl: './gestion-promotion.component.html',
  styleUrls: ['./gestion-promotion.component.scss']
})
export class GestionPromotionComponent implements OnInit,OnDestroy {

  public focus;
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any[]
  bsValue
  public dateDebut: string
  public dateFin: string


  closeResult: string;

  SelectionType = SelectionType;
  constructor(
    private service: BreadcrumbService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.page.pageNumber = 0;
    this.page.size = 10;
  }

  page = new Page();
  public SuscribeAllData: Subscription;
  ngOnDestroy(): void {
    this.SuscribeAllData.unsubscribe;
  }

  ngOnInit(): void {
    this.setPage({ offset: 0 });
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
  //   onSelect({selected}) {
  //     this.selected.splice(0, this.selected.length);
  //     this.selected.push(...selected);
  //  }
  onActivate(event) {
    this.activeRow = event.row;
  }

  // Méthode d'ajout d'élément dans le tableau
  setPage(pageInfo) {
    this.SuscribeAllData=this.service.getApi({ page: pageInfo.offset + 1 }).subscribe({
      next: (value) => {
        // this.page.pageNumber = pageInfo.offset;
        // this.page.size = 20;
        // this.page.totalElements = value.count;
        // this.page.totalPages = 9;
        console.log("Appel Api", value.results);
        this.temp = value.results;
      },
    });
    this.temp = this.temp.map((prop, key) => {
      return {
        ...prop,
        id: key,
        homeworld: prop.homeworld, // Remplacez par l'URL réelle de l'image pour chaque élément
      };
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

  // close() {
  //   this.modalService.dismissAll(this.closeResult);
  // }

  // ontet() {
  //   console.log("vilain  ca marche pas");
  // }


  // Méthode pour suuprimer une catégorie  de produit
  onDeletePromotion(id: number) {
    console.log("produits supprimer");
  }

}

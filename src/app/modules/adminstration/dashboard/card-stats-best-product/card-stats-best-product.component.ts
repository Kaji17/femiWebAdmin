import { Component, Input, OnInit } from "@angular/core";
import { StatistiqueService } from "src/app/shared/services/statistique.service";
import { UtilisService } from "src/app/shared/services/utilis.service";

@Component({
  selector: "app-card-stats-best-product",
  templateUrl: "./card-stats-best-product.component.html",
  styleUrls: ["./card-stats-best-product.component.scss"],
})
export class CardStatsBestProductComponent implements OnInit {
  @Input() listZone: any[];
  @Input() configZone: any;

  boutiqueNbreCmdeSelect: any;
  zoneselectNbreCmde: any;
  tempNombreCommandeProduit: any[];
  objSearchCmde: any;
  infoUser: any;
  constructor(
    private utilitisService: UtilisService,
    private statistiqueService: StatistiqueService
  ) {
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
  }

  ngOnInit(): void {
    this.objSearchCmde = {
      boutiqueid: this.infoUser.body.boutique.id,
    };
    this.getStatProduitPlusVendus({
      boutiqueid: this.infoUser.body.boutique.id,
    });
  }

    // Donnée statistique des produit les plus vendus
    getStatProduitPlusVendus(obj) {
      this.statistiqueService.produitPlusVendusStatistique(obj).subscribe({
        next: (data) => {
          this.utilitisService.response(data, (d: any) => {
            console.log(d);
            if (data.status == 200) {
              this.tempNombreCommandeProduit = [];
              let lis: any[] = [];
              lis = d.body;
              lis.map((el) => {
                this.tempNombreCommandeProduit.push(el);
              });
              console.log(
                "list des stats nombre de commande ====",
                this.tempNombreCommandeProduit
              );
            }
          });
        },
        error: (error) => {
          this.utilitisService.response(error, (d: any) => {});
        },
      });
    }

    filterzone() {
      console.log("zone search", this.zoneselectNbreCmde);
      if (this.zoneselectNbreCmde.length != 0 && this.zoneselectNbreCmde != undefined) {
        this.objSearchCmde.zoneid = this.zoneselectNbreCmde.id;
        this.getStatProduitPlusVendus(this.objSearchCmde);
        console.log("obj search", this.objSearchCmde);
      } else {
        this.objSearchCmde.zoneid = null;
        this.objSearchCmde = {
          boutiqueid: this.infoUser.body.boutique.id,
          periode: "day",
        };
        this.getStatProduitPlusVendus(this.objSearchCmde);
      }
    }
}

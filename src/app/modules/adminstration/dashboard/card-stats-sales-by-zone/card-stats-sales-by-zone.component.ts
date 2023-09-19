import { Component, Input, OnInit } from "@angular/core";
import { StatistiqueService } from "src/app/shared/services/statistique.service";
import { UtilisService } from "src/app/shared/services/utilis.service";

@Component({
  selector: "app-card-stats-sales-by-zone",
  templateUrl: "./card-stats-sales-by-zone.component.html",
  styleUrls: ["./card-stats-sales-by-zone.component.scss"],
})
export class CardStatsSalesByZoneComponent implements OnInit {
  @Input() listPeriode: any[];
  @Input() listZone: any[];
  @Input() configperiode: any;
  @Input() configZone: any;
  periodeselectSales: any;
  zoneselectSales: any;
  tempNombreVentes: any[];
  objSearchSales: any;
  infoUser: any;

  constructor(
    private utilitisService: UtilisService,
    private statistiqueService: StatistiqueService
  ) {
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
  }

  ngOnInit(): void {
    this.objSearchSales = {
      periode: "day",
      boutiqueid: this.infoUser.body.boutique.id,
    };
    this.getStatNombreDeVentesByZone({
      periode: "day",
      boutiqueid: this.infoUser.body.boutique.id,
    });
  }

  // Filtrer par zone
  filterzone() {
    console.log("zone search", this.zoneselectSales);
    if (this.zoneselectSales.length != 0 && this.zoneselectSales != undefined) {
      this.objSearchSales.zoneid = this.zoneselectSales.id;
      this.getStatNombreDeVentesByZone(this.objSearchSales);
      console.log("obj search", this.objSearchSales);
    } else {
      this.objSearchSales.zoneid = null;
      this.objSearchSales = {
        periode: "day",
      };
      this.getStatNombreDeVentesByZone(this.objSearchSales);
    }
  }

  // Filtrer par periode
  filterperiode() {
    if (this.periodeselectSales.key) {
      console.log("periode search", this.periodeselectSales);
      this.objSearchSales.periode = this.periodeselectSales.key;
      this.getStatNombreDeVentesByZone(this.objSearchSales);
      console.log("obj search", this.objSearchSales);
    } else {
      let obj: any = {
        periode: "day",
      };
      this.objSearchSales = obj;
      this.getStatNombreDeVentesByZone(this.objSearchSales);
    }
  }

  // Donnée statistique de nombre de vente par  zone
  getStatNombreDeVentesByZone(obj) {
    this.statistiqueService.nombreVentesStatistique(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.tempNombreVentes = [];
            let lis: any[] = [];
            lis = d.body;
            lis.map((el) => {
              this.tempNombreVentes.push(el);
            });
            console.log(
              "list des stats nombre de ventes ====",
              this.tempNombreVentes
            );
          }
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {});
      },
    });
  }
}

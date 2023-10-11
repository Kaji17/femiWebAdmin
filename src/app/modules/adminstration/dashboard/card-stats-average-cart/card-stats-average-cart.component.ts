import { Component, Input, OnInit } from '@angular/core';
import { StatistiqueService } from 'src/app/shared/services/statistique.service';
import { UtilisService } from 'src/app/shared/services/utilis.service';

@Component({
  selector: 'app-card-stats-average-cart',
  templateUrl: './card-stats-average-cart.component.html',
  styleUrls: ['./card-stats-average-cart.component.scss']
})
export class CardStatsAverageCartComponent implements OnInit {
  @Input() listBoutique: any[];
  @Input() listPeriode: any[];
  @Input() listZone: any[];
  @Input() configBoutique: any;
  @Input() configperiode: any;
  @Input() configZone: any;
  periodeselect: any;
  zoneselect: any;
  tempPanierMoyen: any[];
  objSearchPanierMoyen: any;
  infoUser: any;
  constructor(
    private utilitisService: UtilisService,
    private statistiqueService: StatistiqueService
  ) {
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
  }
  ngOnInit(): void {
    this.objSearchPanierMoyen = {
      periode: "day",
      boutiqueid: this.infoUser.body.boutique.id,
    };
    this.getStatPanierMoyen(this.objSearchPanierMoyen);
  }

    // Donnée statistique de panier moyen
    getStatPanierMoyen(obj) {
      this.statistiqueService.panierMoyenStatistique(obj).subscribe({
        next: (data) => {
          this.utilitisService.response(data, (d: any) => {
            console.log(d);
            if (data.status == 200) {
              this.tempPanierMoyen = [];
              let lis: any[] = [];
              lis = d.body;
              lis.map((el) => {
                this.tempPanierMoyen.push(el);
              });
              console.log(
                "list des stats panier moyen ====",
                this.tempPanierMoyen
              );
            }
          });
        },
        error: (error) => {
          this.utilitisService.response(error, (d: any) => {});
        },
      });
    }

      // Filtrer par zone
  filterzone() {
    console.log("zone search", this.zoneselect);
    if (this.zoneselect.length != 0 && this.zoneselect != undefined) {
      this.objSearchPanierMoyen.zoneid = this.zoneselect.id;
      this.getStatPanierMoyen(this.objSearchPanierMoyen);
      console.log("obj search", this.objSearchPanierMoyen);
    } else {
      this.objSearchPanierMoyen.zoneid = null;
      this.objSearchPanierMoyen = {
        periode: "day",
        boutiqueid: this.infoUser.body.boutique.id,
      };
      this.getStatPanierMoyen(this.objSearchPanierMoyen);
    }
  }

  // Filtrer par periode
  filterperiode() {
    if (this.periodeselect.key) {
      console.log("periode search", this.periodeselect);
      this.objSearchPanierMoyen.periode = this.periodeselect.key;
      this.getStatPanierMoyen(this.objSearchPanierMoyen);
      console.log("obj search", this.objSearchPanierMoyen);
    } else {
      let obj: any = {
        periode: "day",
        boutiqueid: this.infoUser.body.boutique.id,
      };
      this.objSearchPanierMoyen = obj;
      this.getStatPanierMoyen(this.objSearchPanierMoyen);
    }
  }
  

}

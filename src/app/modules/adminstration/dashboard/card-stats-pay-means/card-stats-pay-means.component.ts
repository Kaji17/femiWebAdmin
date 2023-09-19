import { Component, Input, OnInit } from '@angular/core';
import { StatistiqueService } from 'src/app/shared/services/statistique.service';
import { UtilisService } from 'src/app/shared/services/utilis.service';
import Chart from "chart.js";
import { chartExample1, chartExample2 } from "src/app/variables/charts";

@Component({
  selector: 'app-card-stats-pay-means',
  templateUrl: './card-stats-pay-means.component.html',
  styleUrls: ['./card-stats-pay-means.component.scss']
})
export class CardStatsPayMeansComponent implements OnInit {
  @Input() listZone: any[];
  @Input() configZone: any;
  dataTotalModePaiement: any;
  public produitChart;

  boutiqueModePaiementSelect: any;
  zoneselectModePaiement: any;
  objSearchModePay: any;
  infoUser: any;
  constructor(
    private utilitisService: UtilisService,
    private statistiqueService: StatistiqueService
  ) {
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
  }
  ngOnInit(): void {
    this.objSearchModePay = {
      boutiqueid: this.infoUser.body.boutique.id,
    };


    this.getStatModePaiement({
      boutiqueid: this.infoUser.body.boutique.id,
    });
  }


  // Donnée statistique de nombre de vente par  zone
  getStatModePaiement(obj) {
    this.statistiqueService.modePaiementStatistique(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.dataTotalModePaiement = {
              labels: [],
              datasets: [
                {
                  labels: [],
                  data: [],
                  backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                  ],
                  hoverOffset: 4,
                },
              ],
            };
            let tab: [] = d.body;
            console.log("data orde1===", this.dataTotalModePaiement);
            tab.map((el: any) => {
              this.dataTotalModePaiement.labels.push(el.modepaiement);
              this.dataTotalModePaiement.datasets[0].labels.push(
                el.modepaiement
              );

              this.dataTotalModePaiement.datasets[0].data.push(el.nombre);
              console.log("data orde2===", this.dataTotalModePaiement);
            });
            console.log("INIT CHART mode paiement=======");
            var chartProduit = document.getElementById("chart-produit");

            this.produitChart = new Chart(chartProduit, {
              type: "pie",
              data: this.dataTotalModePaiement,
            });
          }
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {});
      },
    });
  }


  // Modifier Donnée statistique de chiffre d'affaire
  updateModePaiement(obj) {
    this.statistiqueService.modePaiementStatistique(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.dataTotalModePaiement = {
              labels: [],
              datasets: [
                {
                  labels: [],
                  data: [],
                  backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                  ],
                  hoverOffset: 4,
                },
              ],
            };
            let tab: [] = d.body;
            console.log("data orde1===", this.dataTotalModePaiement);
            tab.map((el: any) => {
              this.dataTotalModePaiement.labels.push(el.modepaiement);
              this.dataTotalModePaiement.datasets[0].labels.push(
                el.modepaiement
              );

              this.dataTotalModePaiement.datasets[0].data.push(el.nombre);
              console.log("data orde2===", this.dataTotalModePaiement);
            });
            this.produitChart.data.datasets[0].data =
              this.dataTotalModePaiement.datasets[0].data;
            this.produitChart.data.labels = this.dataTotalModePaiement.labels;
            this.produitChart.update();
          }
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {});
      },
    });
  }


  filterzone(){
    console.log("zone search", this.zoneselectModePaiement);
    if (this.zoneselectModePaiement.length!=0&&this.zoneselectModePaiement!=undefined) {
      this.objSearchModePay.zoneid = this.zoneselectModePaiement.id;
      this.updateModePaiement(this.objSearchModePay);
      console.log("obj search", this.objSearchModePay);
    } else {
      this.objSearchModePay.zoneid = null;
      this.objSearchModePay = {
        //
      };
      this.updateModePaiement(this.objSearchModePay);
    }
  }

}

import { Component, OnInit } from "@angular/core";
import { StatistiqueService } from "src/app/shared/services/statistique.service";
import { UtilisService } from "src/app/shared/services/utilis.service";
import Chart from "chart.js";
import { chartExample1, chartExample2 } from "src/app/variables/charts";

@Component({
  selector: "app-card-stats-chart-orders-sales",
  templateUrl: "./card-stats-chart-orders-sales.component.html",
  styleUrls: ["./card-stats-chart-orders-sales.component.scss"],
})
export class CardStatsChartOrdersSalesComponent implements OnInit {
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  public clicked3: boolean = false;
  public dataTotalOrders: any;
  public dataTotalChiffreAffaire: any;
  public salesChart;
  public ordersChart;
  public tempPanierMoyen: any[];
  public tempNombreVentes: any[];
  infoUser: any;
  constructor(
    private utilitisService: UtilisService,
    private statistiqueService: StatistiqueService
  ) {
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
  }

  ngOnInit(): void {
    this.getStatChiffreAffaire({
      periode: "month",
      boutiqueid: this.infoUser.body.boutique.id,
    });

    this.getStatNombreDeVentes({
      periode: "month",
      boutiqueid: this.infoUser.body.boutique.id,
    });
  }

  // Modification des data des charts des stats de chiffres d'affaire et nombre de commande
  public updateOptions(type: number) {
    switch (type) {
      case 1:
        this.updateData({
          periode: "day",
          boutiqueid: this.infoUser.body.boutique.id,
        });

        this.updateDataChiffreAffaire({
          periode: "day",
          boutiqueid: this.infoUser.body.boutique.id,
        });
        break;

      case 2:
        this.updateData({
          periode: "year",
          boutiqueid: this.infoUser.body.boutique.id,
        });

        this.updateDataChiffreAffaire({
          periode: "year",
          boutiqueid: this.infoUser.body.boutique.id,
        });
        break;
      case 3:
        this.updateData({
          periode: "week",
          boutiqueid: this.infoUser.body.boutique.id,
        });

        this.updateDataChiffreAffaire({
          periode: "week",
          boutiqueid: this.infoUser.body.boutique.id,
        });
        break;
      default:
        this.updateData({
          periode: "month",
          boutiqueid: this.infoUser.body.boutique.id,
        });

        this.updateDataChiffreAffaire({
          periode: "month",
          boutiqueid: this.infoUser.body.boutique.id,
        });
        break;
    }
  }

  // Modifier Donnée statistique de nombre de vente
  updateData(obj) {
    let currentDate = new Date();

    let currentYear = currentDate.getFullYear();
    let curentMonth = currentDate.getMonth();
    this.statistiqueService.nombreVentesStatistique(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            switch (obj.periode) {
              case "year":
                this.dataTotalOrders = {
                  labels: [],
                  datasets: [
                    {
                      label: "Commandes",
                      data: [],
                      maxBarThickness: 12,
                    },
                  ],
                };
                let tabyear: [] = d.body;
                console.log("data orde1===", this.dataTotalOrders);
                tabyear.map((el: any) => {
                  let date = new Date(el.periode);

                  // Donne les stats de l'année en cours
                  if (date.getFullYear() == currentYear) {
                    let yearGet = date.getFullYear();
                    this.dataTotalOrders.labels.push(`${yearGet}`);
                    this.dataTotalOrders.datasets[0].data.push(el.nombreventes);
                    console.log("data orde2===", this.dataTotalOrders);
                  }
                });
                this.ordersChart.data.datasets[0].data =
                  this.dataTotalOrders.datasets[0].data;
                this.ordersChart.data.labels = this.dataTotalOrders.labels;
                this.ordersChart.update();
                break;

              case "day":
                this.dataTotalOrders = {
                  labels: [],
                  datasets: [
                    {
                      label: "Commandes",
                      data: [],
                      maxBarThickness: 12,
                    },
                  ],
                };
                let tabD: [] = d.body;
                console.log("data orde1Day===", this.dataTotalOrders);
                tabD.map((el: any) => {
                  // console.log("data date===", el)
                  let date = new Date(el.periode);

                  if (
                    
                    date.getFullYear() == currentYear
                  ) {
                    let moisDay = date.getDay();
                    console.log("day===", moisDay);

                    let objDate: string;

                    objDate = `${date.getDate()}/${
                      date.getMonth() + 1
                    }/${date.getFullYear()}`;
                    this.dataTotalOrders.labels.push(objDate);
                    this.dataTotalOrders.datasets[0].data.push(el.nombreventes);

                    console.log("data orde2Day===", this.dataTotalOrders);
                  }
                });
                this.ordersChart.data.datasets[0].data =
                  this.dataTotalOrders.datasets[0].data;
                this.ordersChart.data.labels = this.dataTotalOrders.labels;

                this.ordersChart.update();
                break;
              case "week":
                this.dataTotalOrders = {
                  labels: [],
                  datasets: [
                    {
                      label: "Commandes",
                      data: [],
                      maxBarThickness: 12,
                    },
                  ],
                };
                let tabW: [] = d.body;
                console.log("data orde1Day===", this.dataTotalOrders);
                tabW.map((el: any) => {
                  // console.log("data date===", el)
                  let date = new Date(el.periode);

                  if (
                    
                    date.getFullYear() == currentYear
                  ) {
                    let moisDay = date.getDay();
                    console.log("day===", moisDay);

                    let objDate: string;

                    objDate = `${date.getDate()}/${
                      date.getMonth() + 1
                    }/${date.getFullYear()}`;
                    this.dataTotalOrders.labels.push(objDate);
                    this.dataTotalOrders.datasets[0].data.push(el.nombreventes);

                    console.log("data orde2Day===", this.dataTotalOrders);
                  }
                });
                this.ordersChart.data.datasets[0].data =
                  this.dataTotalOrders.datasets[0].data;
                this.ordersChart.data.labels = this.dataTotalOrders.labels;
                this.ordersChart.update();
                break;

              default:
                this.dataTotalOrders = {
                  labels: [],
                  datasets: [
                    {
                      label: "Commandes",
                      data: [],
                      maxBarThickness: 12,
                    },
                  ],
                };
                let tab: [] = d.body;
                console.log("data orde1===", this.dataTotalOrders);
                  // let date = new Date(el.periode);

                  // Donne les stats de l'année en cours
                  tab.map((el: any) => {
                    // console.log("data date===", el)
                    let date = new Date(el.periode);

                    if (date.getFullYear() == currentYear) {
                      // let moisGet = date.getMonth();
                      let objDate: string;
                      objDate = `${date.getMonth() + 1}/${date.getFullYear()}`;
                      this.dataTotalOrders.labels.push(objDate);
                      this.dataTotalOrders.datasets[0].data.push(
                        el.nombreventes
                      );
                    }
                  });
                  this.ordersChart.data.datasets[0].data =
                  this.dataTotalOrders.datasets[0].data;
                this.ordersChart.data.labels = this.dataTotalOrders.labels;
                this.ordersChart.update();
                break;
                
            }
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
  
  // Modifier Donnée statistique de chiffre d'affaire
  updateDataChiffreAffaire(obj) {
    let currentDate = new Date();

    let currentYear = currentDate.getFullYear();
    let curentMonth = currentDate.getMonth();
    this.statistiqueService.chiffreAffaireStatistique(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            switch (obj.periode) {
              case "year":
                this.dataTotalChiffreAffaire = {
                  labels: [],
                  datasets: [
                    {
                      label: "Performance",
                      data: [],
                      maxBarThickness: 12,
                    },
                  ],
                };
                let tabyear: [] = d.body;
                console.log("data orde1===", this.dataTotalChiffreAffaire);
                tabyear.map((el: any) => {
                  let date = new Date(el.periode);

                  // Donne les stats de l'année en cours
                  if (date.getFullYear()) {
                    let yearGet = date.getFullYear();
                    this.dataTotalChiffreAffaire.labels.push(`${yearGet}`);
                    this.dataTotalChiffreAffaire.datasets[0].data.push(
                      el.chiffre_affaires
                    );
                    console.log("data orde2===", this.dataTotalChiffreAffaire);
                  }
                });
                console.log("check===");
                this.salesChart.data.datasets[0].data =
                  this.dataTotalChiffreAffaire.datasets[0].data;
                this.salesChart.data.labels =
                  this.dataTotalChiffreAffaire.labels;
                this.salesChart.update();
                break;

              case "day":
                this.dataTotalChiffreAffaire = {
                  labels: [],
                  datasets: [
                    {
                      label: "Performance",
                      data: [],
                      maxBarThickness: 12,
                    },
                  ],
                };
                let tabD: [] = d.body;
                console.log("data orde1Day===", this.dataTotalChiffreAffaire);
                tabD.map((el: any) => {
                  // console.log("data date===", el)
                  let date = new Date(el.periode);

                  if (
                    
                    date.getFullYear() == currentYear
                  ) {
                    let moisDay = date.getDay();
                    console.log("day===", moisDay);

                    let objDate: string;

                    objDate = `${date.getDate()}/${
                      date.getMonth() + 1
                    }/${date.getFullYear()}`;
                    this.dataTotalChiffreAffaire.labels.push(objDate);
                    this.dataTotalChiffreAffaire.datasets[0].data.push(
                      el.chiffre_affaires
                    );

                    console.log(
                      "data orde2Day===",
                      this.dataTotalChiffreAffaire
                    );
                  }
                });
                this.salesChart.data.datasets[0].data =
                  this.dataTotalChiffreAffaire.datasets[0].data;
                this.salesChart.data.labels =
                  this.dataTotalChiffreAffaire.labels;
                this.salesChart.update();
                break;

              case "week":
                this.dataTotalChiffreAffaire = {
                  labels: [],
                  datasets: [
                    {
                      label: "Performance",
                      data: [],
                      maxBarThickness: 12,
                    },
                  ],
                };
                let tabW: [] = d.body;
                console.log("data orde1Day===", this.dataTotalChiffreAffaire);
                tabW.map((el: any) => {
                  // console.log("data date===", el)
                  let date = new Date(el.periode);

                  if (
                    date.getFullYear() == currentYear
                  ) {
                    let moisDay = date.getDay();
                    console.log("day===", moisDay);

                    let objDate: string;

                    objDate = `${date.getDate()}/${
                      date.getMonth() + 1
                    }/${date.getFullYear()}`;
                    this.dataTotalChiffreAffaire.labels.push(objDate);
                    this.dataTotalChiffreAffaire.datasets[0].data.push(
                      el.chiffre_affaires
                    );

                    console.log(
                      "data orde2Day===",
                      this.dataTotalChiffreAffaire
                    );
                  }
                });
                this.salesChart.data.datasets[0].data =
                  this.dataTotalChiffreAffaire.datasets[0].data;
                this.salesChart.data.labels =
                  this.dataTotalChiffreAffaire.labels;
                this.salesChart.update();
                break;

              default:
                this.dataTotalChiffreAffaire = {
                  labels: [],
                  datasets: [
                    {
                      label: "Performance",
                      data: [],
                      maxBarThickness: 12,
                    },
                  ],
                };
                let tab: [] = d.body;
                console.log("data orde1===", this.dataTotalChiffreAffaire);

                  // let date = new Date(el.periode);

                  // Donne les stats de l'année en cours
                  tab.map((el: any) => {
                    // console.log("data date===", el)
                    let date = new Date(el.periode);

                    if (date.getFullYear() == currentYear) {
                      // let moisGet = date.getMonth();
                      let objDate: string;
                      objDate = `${date.getMonth() + 1}/${date.getFullYear()}`;
                      this.dataTotalChiffreAffaire.labels.push(objDate);
                      this.dataTotalChiffreAffaire.datasets[0].data.push(
                        el.chiffre_affaires
                      );
                    }
                  });
                this.salesChart.data.datasets[0].data =
                  this.dataTotalChiffreAffaire.datasets[0].data;
                this.salesChart.data.labels =
                  this.dataTotalChiffreAffaire.labels;
                this.salesChart.update();
                break;
            }
          }
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {});
      },
    });
  }

  // Donnée statistique de chiffre d'affaire
  getStatChiffreAffaire(obj) {
    let currentDate = new Date();

    let currentYear = currentDate.getFullYear();

    let curentMonth = currentDate.getMonth();

    this.statistiqueService.chiffreAffaireStatistique(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            switch (obj.periode) {
              case "year":
                this.dataTotalChiffreAffaire = {
                  labels: [],
                  datasets: [
                    {
                      label: "Performance",
                      data: [],
                      maxBarThickness: 12,
                    },
                  ],
                };
                let tabyear: [] = d.body;
                console.log(
                  "data chiffreAffaire===",
                  this.dataTotalChiffreAffaire
                );
                tabyear.map((el: any) => {
                  let date = new Date(el.periode);

                  // Donne les stats de l'année en cours
                  if (date.getFullYear() == currentYear) {
                    let yearGet = date.getFullYear();
                    this.dataTotalChiffreAffaire.labels.push(`${yearGet}`);
                    this.dataTotalChiffreAffaire.datasets[0].data.push(
                      el.chiffre_affaires
                    );
                    console.log(
                      "data chiffre Affaire===",
                      this.dataTotalChiffreAffaire
                    );
                  }
                });
                console.log("INIT CHART Chiffre  affaire=======");
                var chartSales = document.getElementById("chart-sales");
                this.salesChart = new Chart(chartSales, {
                  type: "line",
                  options: chartExample1.options,
                  data: this.dataTotalChiffreAffaire,
                });
                break;

              case "day":
                this.dataTotalChiffreAffaire = {
                  labels: [],
                  datasets: [
                    {
                      label: "Performance",
                      data: [],
                      maxBarThickness: 12,
                    },
                  ],
                };
                let tabD: [] = d.body;
                console.log(
                  "data chiffre affaire 1Day===",
                  this.dataTotalChiffreAffaire
                );
                tabD.map((el: any) => {
                  // console.log("data date===", el)
                  let date = new Date(el.periode);

                  if (
                    date.getMonth() == curentMonth &&
                    date.getFullYear() == currentYear
                  ) {
                    let moisDay = date.getDay();
                    console.log("day===", moisDay);

                    this.dataTotalChiffreAffaire.datasets[0].data[moisDay - 1] =
                      el.chiffre_affaires;
                    console.log(
                      "data orde2Day===",
                      this.dataTotalChiffreAffaire
                    );
                    +"/" + curentMonth + 1 + "/" + currentYear;
                  }
                });

                console.log("INIT CHART sales=======");
                var chartSales = document.getElementById("chart-sales");
                this.salesChart = new Chart(chartSales, {
                  type: "line",
                  options: chartExample1.options,
                  data: this.dataTotalChiffreAffaire,
                });
                break;

              default:
                this.dataTotalChiffreAffaire = {
                  labels: [],
                  datasets: [
                    {
                      label: "Performance",
                      data: [],
                      maxBarThickness: 12,
                    },
                  ],
                };
                let tab: [] = d.body;
                console.log(
                  "data chiffe affaire 1===",
                  this.dataTotalChiffreAffaire
                );

                tab.map((el: any) => {
                  // console.log("data date===", el)
                  let date = new Date(el.periode);

                  if (date.getFullYear() == currentYear) {
                    // let moisGet = date.getMonth();
                    let objDate: string;
                    objDate = `${date.getMonth() + 1}/${date.getFullYear()}`;
                    this.dataTotalChiffreAffaire.labels.push(objDate);
                    this.dataTotalChiffreAffaire.datasets[0].data.push(
                      el.chiffre_affaires
                    );
                  }
                });
                console.log("INIT CHART sales=======");
                var chartSales = document.getElementById("chart-sales");
                this.salesChart = new Chart(chartSales, {
                  type: "line",
                  options: chartExample1.options,
                  data: this.dataTotalChiffreAffaire,
                });
                break;
            }
          }
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {});
      },
    });
  }

  // Donnée statistique de nombre de vente
  getStatNombreDeVentes(obj) {
    let currentDate = new Date();

    let currentYear = currentDate.getFullYear();

    let curentMonth = currentDate.getMonth();

    this.statistiqueService.nombreVentesStatistique(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            switch (obj.periode) {
              case "year":
                this.dataTotalOrders = {
                  labels: [],
                  datasets: [
                    {
                      label: "Commandes",
                      data: [],
                      maxBarThickness: 12,
                    },
                  ],
                };
                let tabyear: [] = d.body;
                console.log("data orde1===", this.dataTotalOrders);
                tabyear.map((el: any) => {
                  let date = new Date(el.periode);

                  // Donne les stats de l'année en cours
                  if (date.getFullYear() == currentYear) {
                    let yearGet = date.getFullYear();
                    this.dataTotalOrders.labels.push(`${yearGet}`);
                    this.dataTotalOrders.datasets[0].data.push(el.nombreventes);
                    console.log("data orde2===", this.dataTotalOrders);
                  }
                });
                console.log("INIT CHART ORDER=======");
                var chartOrders = document.getElementById("chart-orders");
                this.ordersChart = new Chart(chartOrders, {
                  type: "bar",
                  options: chartExample2.options,
                  data: this.dataTotalOrders,
                });
                break;

              case "day":
                this.dataTotalOrders = {
                  labels: [],
                  datasets: [
                    {
                      label: "Commandes",
                      data: [],
                      maxBarThickness: 12,
                    },
                  ],
                };
                let tabD: [] = d.body;
                console.log("data orde1Day===", this.dataTotalOrders);
                tabD.map((el: any) => {
                  // console.log("data date===", el)
                  let date = new Date(el.periode);

                  if (
                    date.getMonth() == curentMonth &&
                    date.getFullYear() == currentYear
                  ) {
                    let moisDay = date.getDay();
                    console.log("day===", moisDay);

                    this.dataTotalOrders.datasets[0].data[moisDay - 1] =
                      el.nombreventes;
                    console.log("data orde2Day===", this.dataTotalOrders);
                    +"/" + curentMonth + 1 + "/" + currentYear;
                  }
                });

                console.log("INIT CHART ORDER=======");
                var chartOrders = document.getElementById("chart-orders");
                this.ordersChart = new Chart(chartOrders, {
                  type: "bar",
                  options: chartExample2.options,
                  data: this.dataTotalOrders,
                });
                break;

              default:
                this.dataTotalOrders = {
                  labels: [],
                  datasets: [
                    {
                      label: "Commandes",
                      data: [],
                      maxBarThickness: 12,
                    },
                  ],
                };

                let tab: [] = d.body;
                console.log(
                  "data chiffe affaire 1===",
                  this.dataTotalChiffreAffaire
                );

                tab.map((el: any) => {
                  // console.log("data date===", el)
                  let date = new Date(el.periode);

                  if (date.getFullYear() == currentYear) {
                    // let moisGet = date.getMonth();
                    let objDate: string;
                    objDate = `${date.getMonth() + 1}/${date.getFullYear()}`;
                    this.dataTotalOrders.labels.push(objDate);
                    this.dataTotalOrders.datasets[0].data.push(el.nombreventes);
                  }
                });

                console.log("INIT CHART ORDER=======");
                var chartOrders = document.getElementById("chart-orders");
                this.ordersChart = new Chart(chartOrders, {
                  type: "bar",
                  options: chartExample2.options,
                  data: this.dataTotalOrders,
                });
                break;
            }

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
}

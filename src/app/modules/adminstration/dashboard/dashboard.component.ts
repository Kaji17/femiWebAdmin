import { Component, OnInit } from "@angular/core";

import {
  parseOptions,
  chartOptions,
  chartExample2,
  chartExample1,
  chartExample3,
} from "src/app/variables/charts";
import Chart from "chart.js";
import { BreadcrumbService } from "src/app/shared/services/breadcrumb.service";
import { UtilisService } from "src/app/shared/services/utilis.service";
import { ZoneService } from "src/app/shared/services/zone.service";
import { Page } from "src/app/shared/model/paged";
import { StatistiqueService } from "src/app/shared/services/statistique.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public labelsWeeksDays: string[];
  public labelsMonth: string[];
  public labelsYears: string[];
  public salesChart;
  public ordersChart;
  public produitChart;
  public revenuProduitChart;

  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;

  // variable 1
  public chiffreAffaireTotal: number;
  public tauxCroissanceCA: number;
  public totalNewUser: number;
  public totalVentes: number;
  public totalNombreProduit: number;
  public tauxCroissancetotalNewUser: number;
  public tauxCroissancetotalVentes: number;
  public tauxCroissancetotalNombreProduit: number;
  public noteProduit: number;
  public avis: any[];
  public commandeByZone: any[];
  public itemsbreadcrumb: any[];
  public tittelbreadcrumb: string = "Dasboard";
  tempPanierMoyen: any[];
  activeRow: any;

  listZone: any[];
  listPeriode: any[] = [
    { label: "Jour", key: "day" },
    { label: "Mois", key: "month" },
    { label: "Semaine", key: "week" },
    { label: "Année", key: "year" },
  ];
  configZone = {
    // displayFn:(item: any) => { return item.zone.nom?item.zone.nom:item.nom; },
    displayKey: "nom", //if objects array passed which key to be displayed defaults to description
    height: "300px", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "zone", // text to be displayed when no item is selected defaults to Select,
    search: true,
    searchOnKey: "nom",
  };
  configperiode = {
    displayKey: "label", //if objects array passed which key to be displayed defaults to description
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    // text to be displayed when no item is selected defaults to Select,
    placeholder: this.listPeriode[0].label,
  };
  zoneselect: any;
  objSearchPanierMoyen: any;
  page = new Page();
  infoUser: any;
  periodeselect: any;

  dataTotalOrders: any;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private utilitisService: UtilisService,
    private zoneService: ZoneService,
    private statistiqueService: StatistiqueService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
  }
  ngOnInit() {
    //
    this.getAllZone({
      pagination: false,
    });

    this.objSearchPanierMoyen = {
      periode: "day",
      boutiqueid: this.infoUser.body.boutique.id,
    };
    this.getStatPanierMoyen(this.objSearchPanierMoyen);
    //
    this.chiffreAffaireTotal = 0;
    this.tauxCroissanceCA = 0;
    this.totalNewUser = 0;
    this.totalVentes = 0;
    this.totalNombreProduit = 0;
    this.tauxCroissancetotalNewUser = 0;
    this.tauxCroissancetotalVentes = 0;
    this.tauxCroissancetotalNombreProduit = 0;
    this.noteProduit = 5;

    this.itemsbreadcrumb = [
      { name: "Accueil", path: "/administration/dasboard" },
      { name: "Dasboard", path: "/administration/dasboard" },
    ];

    this.updatebBreadcrumb(this.itemsbreadcrumb, this.tittelbreadcrumb);

    this.avis = [
      {
        produitName: "test",
        note: 4,
        commentaire: 20,
      },
      {
        produitName: "test",
        note: 2,
        commentaire: 20,
      },
      {
        produitName: "test",
        note: 3,
        commentaire: 20,
      },
      {
        produitName: "test",
        note: 1,
        commentaire: 20,
      },
      {
        produitName: "test",
        note: 5,
        commentaire: 20,
      },
    ];
    this.commandeByZone = [
      {
        periode: "10/01/2023",
        nombreDeVente: 20,
      },
      {
        periode: "10/01/2023",
        nombreDeVente: 20,
      },
      {
        periode: "10/01/2023",
        nombreDeVente: 30,
      },
      {
        periode: "10/01/2023",
        nombreDeVente: 10,
      },
      {
        periode: "10/01/2023",
        nombreDeVente: 50,
      },
    ];
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15],
      [100000, 2000000, 2500000, 3000000, 1000000],
    ];
    this.data = this.datasets[0];
    this.labelsMonth = [
      "Jan",
      "Feb",
      "Mars",
      "Avr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    this.labelsWeeksDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

    this.labelsYears = ["2023", "2024", "2025", "2026", "2027"];

    var chartOrders = document.getElementById("chart-orders");

    parseOptions(Chart, chartOptions());

    this.ordersChart = new Chart(chartOrders, {
      type: "bar",
      options: chartExample2.options,
      data: this.dataTotalOrders,
    });

    var chartSales = document.getElementById("chart-sales");

    this.salesChart = new Chart(chartSales, {
      type: "line",
      options: chartExample1.options,
      data: chartExample1.data,
    });

    var chartProduit = document.getElementById("chart-produit");

    this.produitChart = new Chart(chartProduit, {
      type: "pie",
      data: chartExample3.data,
    });

    var chartRevenuProduit = document.getElementById("chart-revenuProduit");

    this.revenuProduitChart = new Chart(chartRevenuProduit, {
      type: "doughnut",
      option: chartExample3.options,
      data: chartExample3.data,
    });
  }

  public updateOptions(type: number) {
    this.salesChart.data.datasets[0].data = this.data;
    this.ordersChart.data.datasets[0].data = this.data;
    switch (type) {
      case 0:
        this.salesChart.data.labels = this.labelsMonth;
        this.salesChart.update();
        this.ordersChart.data.labels = this.labelsMonth;
        this.ordersChart.update();

        break;
      case 1:
        this.salesChart.data.labels = this.labelsWeeksDays;
        this.salesChart.update();
        this.ordersChart.data.labels = this.labelsWeeksDays;
        this.ordersChart.update();
        break;

      case 2:
        this.salesChart.data.labels = this.labelsYears;
        this.salesChart.update();
        this.ordersChart.data.labels = this.labelsYears;
        this.ordersChart.update();
        break;
      default:
        break;
    }
  }

  updatebBreadcrumb(data: any[], title: string) {
    this.breadcrumbService.setData(data, title);
  }

  filterzone() {
    console.log("zone search", this.zoneselect);
    if (this.zoneselect.id) {
      this.objSearchPanierMoyen.zoneid = this.zoneselect.id;
      this.getStatPanierMoyen(this.objSearchPanierMoyen);
      console.log("obj search", this.objSearchPanierMoyen);
    } else {
      this.objSearchPanierMoyen.zoneid = null;
    }
  }
  filterperiode() {
    console.log("periode search", this.periodeselect);
    this.objSearchPanierMoyen.periode = this.periodeselect.key;
    this.getStatPanierMoyen(this.objSearchPanierMoyen);
    console.log("obj search", this.objSearchPanierMoyen);
  }

  onActivate(event) {
    this.activeRow = event.row;
    console.log("Je suis active ===", this.activeRow);
  }

  /************STATISTIQUE****************/

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

  // Donnée statistique de nombre de vente
  getStatNombreDeVentes(obj, per) {
    this.statistiqueService.nombreVentesStatistique(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.dataTotalOrders = {
              labels: [
                "Jan",
                "Feb",
                "Mars",
                "Avr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              datasets: [
                {
                  label: "Commandes",
                  data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  maxBarThickness: 12,
                },
              ],
            };

            switch (per) {
              case "month":
                d.map((el: any) => {
                  let date = new Date(el.periode);
                  let moisGet = date.getMonth();
                  this.dataTotalOrders.datasets[0].data[moisGet] =
                    el.nombreventes;
                });
                break;
              case "year":
                d.map((el: any) => {
                  let date = new Date(el.periode);
                  let moisGet = date.getMonth();
                  this.dataTotalOrders.datasets[0].data[moisGet] =
                    el.nombreventes;
                });
                break;

              default:
                break;
            }

            d.map((el: any) => {
              let date = new Date(el.periode);
              let moisGet = date.getMonth();
              if (!(moisGet == 0)) {
              } else {
              }
              this.dataTotalOrders.labels;
            });
            // this.dataTotalOrders = d
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

  // Get all zone
  getAllZone(obj: any) {
    this.zoneService.gettAllZone(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.listZone = [];
            let lis: any[] = [];
            lis = d.body;
            lis.map((el) => {
              this.listZone.push(el);
            });
            console.log("list des zones ====", this.listZone);
          }
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {});
      },
    });
  }
}

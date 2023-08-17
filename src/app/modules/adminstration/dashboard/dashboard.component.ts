import { Component, OnInit } from "@angular/core";

import {
  parseOptions,
  chartOptions,
  chartExample2,
  chartExample1,
  chartExample3,
} from "src/app/variables/charts";
import Chart from "chart.js";

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
  public revenuProduitChart

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
  public commandeByZone: any[]

  constructor(){
  }
  ngOnInit() {
    this.chiffreAffaireTotal = 0;
    this.tauxCroissanceCA = 0;
    this.totalNewUser = 0;
    this.totalVentes = 0;
    this.totalNombreProduit = 0;
    this.tauxCroissancetotalNewUser = 0;
    this.tauxCroissancetotalVentes = 0;
    this.tauxCroissancetotalNombreProduit = 0;
    this.noteProduit = 5;

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
      },      {
        produitName: "test",
        note: 3,
        commentaire: 20,
      },      {
        produitName: "test",
        note: 1,
        commentaire: 20,
      },      {
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
      },      {
        periode: "10/01/2023",
        nombreDeVente: 30,
      },      {
        periode: "10/01/2023",
        nombreDeVente: 10,
      },      {
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
      data: chartExample2.data,
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
    })

    var chartRevenuProduit = document.getElementById("chart-revenuProduit")

    this.revenuProduitChart = new Chart(chartRevenuProduit,{
      type:"doughnut",
      option: chartExample3.options,
      data : chartExample3.data,
    })
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
}

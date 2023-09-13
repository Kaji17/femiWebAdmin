import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from "@angular/core";

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
import { ClientService } from "src/app/shared/services/client.service";
import { ProduitService } from "src/app/shared/services/produit.service";
import { Store } from "@ngrx/store";
import { initAction } from "src/app/state/01-actions";
import { R3SelectorScopeMode } from "@angular/compiler";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public datasets: any;
  public dataStat: any;
  // public data: any;
  public labelsWeeksDays: string[];
  public labelsMonth: string[];
  public labelsYears: string[];
  public salesChart;
  public ordersChart;
  public produitChart;
  public revenuProduitChart;
  public totalClients: number;

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
  tempNombreVentes: any[];
  tempNombreCommandeProduit: any[];
  tempNombreModePaiement: any[];
  activeRow: any;

  listZone: any[];
  listPeriode: any[] = [
    { label: "Jour", key: "day" },
    { label: "Mois", key: "month" },
    { label: "Semaine", key: "week" },
    { label: "Année", key: "year" },
  ];
  configZone = {
    displayFn: (item: any) => {
      return item.zone.nom;
    },
    displayKey: "nom", //if objects array passed which key to be displayed defaults to description
    height: "300px", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "zone", // text to be displayed when no item is selected defaults to Select,
    enableSelectAll: true,
  };
  configperiode = {
    displayKey: "label", //if objects array passed which key to be displayed defaults to description
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    // text to be displayed when no item is selected defaults to Select,
    placeholder: this.listPeriode[0].label,
    enableSelectAll: true,
  };
  zoneselect: any;
  zoneselectSales: any;
  zoneselectNbreCmde: any;
  zoneselectModePaiement: any;

  objSearchPanierMoyen: any;
  objSearchSales: any;
  objSearchCmde: any;
  objSearchModePay: any;

  page = new Page();
  infoUser: any;
  periodeselect: any;
  periodeselectSales: any;

  dataTotalOrders: any;
  dataTotalChiffreAffaire: any;
  dataTotalModePaiement: any;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private utilitisService: UtilisService,
    private zoneService: ZoneService,
    private statistiqueService: StatistiqueService,
    private clientService: ClientService,
    private produitService: ProduitService,
    private store: Store
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    // this.store.select((state:any)=> state.root).subscribe(response=>{
    //   this.infoUser = response.user
    //   console.log("selecteur: ",this.infoUser)
    // })
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
    this.store.dispatch(initAction());
  }

  ngOnInit() {
    this.getClients({
      pagination: true,
      page: 0,
      size: 1,
      boutiqueid: this.infoUser.body.boutique.id,
    });
    this.getProduits({
      pagination: true,
      page: 0,
      size: 1,
      boutiqueid: this.infoUser.body.boutique.id,
    });
    this.getStatNombreDeVentes({
      periode: "month",
      boutiqueid: this.infoUser.body.boutique.id,
    });

    this.getStatNombreDeVentesByZone({
      periode: "day",
      boutiqueid: this.infoUser.body.boutique.id,
    });

    this.getStatChiffreAffaire({
      periode: "month",
      boutiqueid: this.infoUser.body.boutique.id,
    });

    this.getStatProduitPlusVendus({
      boutiqueid: this.infoUser.body.boutique.id,
    });

    this.getStatModePaiement({
      boutiqueid: this.infoUser.body.boutique.id,
    });
    console.log("data order===", this.dataTotalOrders);
    //
    this.getAllZone({
      pagination: false,
      typezoneid: 2,
    });

    this.objSearchPanierMoyen = {
      periode: "day",
      boutiqueid: this.infoUser.body.boutique.id,
    };

    this.objSearchSales = {
      periode: "day",
      boutiqueid: this.infoUser.body.boutique.id,
    };
    this.objSearchCmde = {
      boutiqueid: this.infoUser.body.boutique.id,
    };

    this.objSearchModePay = {
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

    parseOptions(Chart, chartOptions());

    // var chartRevenuProduit = document.getElementById("chart-revenuProduit");

    // this.revenuProduitChart = new Chart(chartRevenuProduit, {
    //   type: "doughnut",
    //   option: chartExample3.options,
    //   data: chartExample3.data,
    // });
  }


  // Recuprer le nombre de client de la boutique
  getClients(data) {
    // this.temp = [];
    data.pagination = true;
    this.clientService.gettAllClient(data).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log("==client==", d);
          this.totalClients = 0;
          this.totalClients = d.body.totalElements;
        });
      },
      error: (error) => this.utilitisService.response(error),
    });
  }

  // Recuperer le nombre de produit de la boutique 
  getProduits(data) {
    // this.temp = [];
    data.pagination = true;
    this.produitService.gettAllProduit(data).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log("==produits==", d);
          this.totalNombreProduit = 0;
          this.totalNombreProduit = d.body.totalElements;
        });
      },
      error: (error) => this.utilitisService.response(error),
    });
  }

  // Modification des data des charts des stats de chiffres d'affaire et nombre de commande 
  public updateOptions(type: number) {
    switch (type) {
      case 0:
        this.updateData({
          periode: "month",
          boutiqueid: this.infoUser.body.boutique.id,
        });

        this.updateDataChiffreAffaire({
          periode: "month",
          boutiqueid: this.infoUser.body.boutique.id,
        });
        break;
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
      default:
        break;
    }
  }

  updatebBreadcrumb(data: any[], title: string) {
    this.breadcrumbService.setData(data, title);
  }

  // Filtrer par zone
  filterzone(tab) {
    switch (tab) {
      case "panier":
        console.log("zone search", this.zoneselect);
        if (this.zoneselect.zone) {
          this.objSearchPanierMoyen.zoneid = this.zoneselect.zone.id;
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
        break;

      case "sales":
        console.log("zone search", this.zoneselectSales);
        if (this.zoneselectSales.zone) {
          this.objSearchSales.zoneid = this.zoneselectSales.zone.id;
          this.getStatNombreDeVentesByZone(this.objSearchSales);
          console.log("obj search", this.objSearchSales);
        } else {
          this.objSearchSales.zoneid = null;
          this.objSearchSales = {
            periode: "day",
            boutiqueid: this.infoUser.body.boutique.id,
          };
          this.getStatNombreDeVentesByZone(this.objSearchSales);
        }
        break;

      case "commande":
        console.log("zone search", this.zoneselectNbreCmde);
        if (this.zoneselectNbreCmde.zone) {
          this.objSearchCmde.zoneid = this.zoneselectNbreCmde.zone.id;
          this.getStatProduitPlusVendus(this.objSearchCmde);
          console.log("obj search", this.objSearchCmde);
        } else {
          this.objSearchCmde.zoneid = null;
          this.objSearchCmde = {
            boutiqueid: this.infoUser.body.boutique.id,
          };
          this.getStatProduitPlusVendus(this.objSearchCmde);
        }
        break;
      case "modePaiement":
        console.log("zone search", this.zoneselectModePaiement);
        if (this.zoneselectModePaiement.zone) {
          this.objSearchModePay.zoneid = this.zoneselectModePaiement.zone.id;
          // this.getStatModePaiement(this.objSearchModePay);
          this.updateModePaiement(this.objSearchModePay);
          console.log("obj search", this.objSearchModePay);
        } else {
          this.objSearchModePay.zoneid = null;
          this.objSearchModePay = {
            boutiqueid: this.infoUser.body.boutique.id,
          };
          this.updateModePaiement(this.objSearchModePay);
          // this.getStatModePaiement(this.objSearchModePay);
        }
        break;

      default:
        break;
    }
  }

  // Filtrer par periode
  filterperiode(tab) {
    switch (tab) {
      case "panier":
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
        break;

      case "sales":
        if (this.periodeselectSales.key) {
          console.log("periode search", this.periodeselectSales);
          this.objSearchSales.periode = this.periodeselectSales.key;
          this.getStatNombreDeVentesByZone(this.objSearchSales);
          console.log("obj search", this.objSearchSales);
        } else {
          let obj: any = {
            periode: "day",
            boutiqueid: this.infoUser.body.boutique.id,
          };
          this.objSearchSales = obj;
          this.getStatNombreDeVentesByZone(this.objSearchSales);
        }
        break;

      default:
        break;
    }
  }

  onActivate(event) {
    this.activeRow = event.row;
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
                  labels: [
                    "Jan" + "-" + currentYear,
                    "Feb" + "-" + currentYear,
                    "Mars" + "-" + currentYear,
                    "Avr" + "-" + currentYear,
                    "May" + "-" + currentYear,
                    "Jun" + "-" + currentYear,
                    "Jul" + "-" + currentYear,
                    "Aug" + "-" + currentYear,
                    "Sep" + "-" + currentYear,
                    "Oct" + "-" + currentYear,
                    "Nov" + "-" + currentYear,
                    "Dec" + "-" + currentYear,
                  ],
                  datasets: [
                    {
                      label: "Commandes",
                      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      maxBarThickness: 12,
                    },
                  ],
                };
                let tab: [] = d.body;
                console.log("data orde1===", this.dataTotalOrders);
                tab.map((el: any) => {
                  // console.log("data date===", el)
                  let date = new Date(el.periode);

                  // Donne les stats de l'année en cours
                  if (date.getFullYear() == currentYear) {
                    let moisGet = date.getMonth();

                    this.dataTotalOrders.datasets[0].data[moisGet] =
                      el.nombreventes;
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
            }

            // switch (per) {
            //   case "month":
            //     d.map((el: any) => {
            //       let date = new Date(el.periode);
            //       let moisGet = date.getMonth();
            //       this.dataTotalOrders.datasets[0].data[moisGet] =
            //         el.nombreventes;
            //     });
            //     break;
            // case "year":
            //   d.map((el: any) => {
            //     let date = new Date(el.periode);
            //     let moisGet = date.getFullYear();
            //     this.dataTotalOrders.datasets[0].data[moisGet] =
            //       el.nombreventes;
            //   });
            //   break;
            //   case "year":
            //   d.map((el: any) => {
            //     let date = new Date(el.periode);
            //     let moisGet = date.getMonth();
            //     this.dataTotalOrders.datasets[0].data[moisGet] =
            //       el.nombreventes;
            //   });
            //   break;

            //   default:
            //     break;
            // }

            // d.map((el: any) => {
            //   let date = new Date(el.periode);
            //   let moisGet = date.getMonth();
            //   if (!(moisGet == 0)) {
            //   } else {
            //   }
            //   this.dataTotalOrders.labels;
            // });
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
                    date.getMonth() == curentMonth &&
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
                  labels: [
                    "Jan" + "-" + currentYear,
                    "Feb" + "-" + currentYear,
                    "Mars" + "-" + currentYear,
                    "Avr" + "-" + currentYear,
                    "May" + "-" + currentYear,
                    "Jun" + "-" + currentYear,
                    "Jul" + "-" + currentYear,
                    "Aug" + "-" + currentYear,
                    "Sep" + "-" + currentYear,
                    "Oct" + "-" + currentYear,
                    "Nov" + "-" + currentYear,
                    "Dec" + "-" + currentYear,
                  ],
                  datasets: [
                    {
                      label: "Commandes",
                      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      maxBarThickness: 12,
                    },
                  ],
                };
                let tab: [] = d.body;
                console.log("data orde1===", this.dataTotalOrders);
                tab.map((el: any) => {
                  let date = new Date(el.periode);

                  // Donne les stats de l'année en cours
                  if (date.getFullYear() == currentYear) {
                    let moisGet = date.getMonth();

                    this.dataTotalOrders.datasets[0].data[moisGet] =
                      el.nombreventes;
                    console.log("data orde2===", this.dataTotalOrders);
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
                  labels: [
                  ],
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


                  if (
                    date.getFullYear() == currentYear
                  ) {
                    // let moisGet = date.getMonth();
                    let objDate: string;
                      objDate = `${
                        date.getMonth() + 1
                      }/${date.getFullYear()}`;
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
                  if (date.getFullYear() == currentYear) {
                    let yearGet = date.getFullYear();
                    this.dataTotalChiffreAffaire.labels.push(`${yearGet}`);
                    this.dataTotalChiffreAffaire.datasets[0].data.push(
                      el.chiffre_affaires
                    );
                    console.log("data orde2===", this.dataTotalChiffreAffaire);
                  }
                });
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
                    date.getMonth() == curentMonth &&
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
                  labels: [
                  ],
                  datasets: [
                    {
                      label: "Commandes",
                      data: [],
                      maxBarThickness: 12,
                    },
                  ],
                };
                let tab: [] = d.body;
                console.log("data orde1===", this.dataTotalChiffreAffaire);
                tab.map((el: any) => {
                  // let date = new Date(el.periode);

                  // Donne les stats de l'année en cours
                  tab.map((el: any) => {
                    // console.log("data date===", el)
                    let date = new Date(el.periode);
  
  
                    if (
                      date.getFullYear() == currentYear
                    ) {
                      // let moisGet = date.getMonth();
                      let objDate: string;
                        objDate = `${
                          date.getMonth() + 1
                        }/${date.getFullYear()}`;
                        this.dataTotalChiffreAffaire.labels.push(objDate);
                        this.dataTotalChiffreAffaire.datasets[0].data.push(
                          el.chiffre_affaires
                        );
                    }
  
                  });
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

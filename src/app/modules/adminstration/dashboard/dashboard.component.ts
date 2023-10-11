import {
  Component,
  OnInit
} from "@angular/core";

import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import Chart from "chart.js";
import { Page } from "src/app/shared/model/paged";
import { BreadcrumbService } from "src/app/shared/services/breadcrumb.service";
import { ClientService } from "src/app/shared/services/client.service";
import { ProduitService } from "src/app/shared/services/produit.service";
import { UtilisService } from "src/app/shared/services/utilis.service";
import { ZoneService } from "src/app/shared/services/zone.service";
import { initAction } from "src/app/state/01-actions";
import {
  chartOptions,
  parseOptions
} from "src/app/variables/charts";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public datasets: any;
  public dataStat: any;

  totalProd: number;
  // public data: any;
  public totalClients: number;

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
      return item.nom;
    },
    displayKey: "nom", //if objects array passed which key to be displayed defaults to description
    height: "300px", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Filtrer zone", // text to be displayed when no item is selected defaults to Select,
    search:true,
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
lang:string
  constructor(
    private breadcrumbService: BreadcrumbService,
    private zoneService: ZoneService,
    private utilitisService: UtilisService,
    private clientService: ClientService,
    private produitService: ProduitService,
    private store: Store,
    public translate : TranslateService,
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
    this.store.dispatch(initAction());
    this.lang=translate.getBrowserLang()
  }

  ngOnInit() {
    console.log("lang active", this.lang);
    
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
    //
    this.getAllZone({
      pagination: false,
      typezoneid: 2,
    });

    parseOptions(Chart, chartOptions());
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
    data.pagination = true;
    this.produitService.gettAllProduit(data).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log("==produits==", d);
          this.totalProd = d.body.totalElements;
        });
      },
      error: (error) => this.utilitisService.response(error),
    });
  }



  updatebBreadcrumb(data: any[], title: string) {
    this.breadcrumbService.setData(data, title);
  }


  onActivate(event) {
    this.activeRow = event.row;
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
              this.listZone.push(el.zone);
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

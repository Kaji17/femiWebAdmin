import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Configurable } from "src/app/core/config";
import { CommandeService } from "src/app/shared/services/commande.service";
import { RolePermissionsService } from "src/app/shared/services/role-permissions.service";
import { UtilisService } from "src/app/shared/services/utilis.service";
import * as FileSaver from "file-saver";
import { SelectionType } from "@swimlane/ngx-datatable";
import { Page } from "src/app/shared/model/paged";
import { ModePaiementService } from "src/app/shared/services/mode-paiement.service";
import { ZoneService } from "src/app/shared/services/zone.service";

@Component({
  selector: "app-gestion-commande",
  templateUrl: "./gestion-commande.component.html",
  styleUrls: ["./gestion-commande.component.scss"],
})
export class GestionCommandeComponent implements OnInit {
  public currentRoute: string;
  public itemsbreadcrumb: any[];
  public tittelbreadcrumb: string = "Commandes";
  public focus;
  public infoUser: any;
  public crudPerms: any;
  public menuItems: any[];
  public objSearch:any
  zoneselect:any
  modepaiementselect:any
  statutselect:any
  statutpaiementselect:any
  commandeId:any
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  tempExport = [];
  activeRow: any;
  rows: any[];
  closeResult: string;
  SelectionType = SelectionType;
  page = new Page();
  listModePaiement: any[];
  configModePaiement = {
    displayKey: "nom", //if objects array passed which key to be displayed defaults to description
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Filter Mode paiement", // text to be displayed when no item is selected defaults to Select,
  };
  listZone: any[]
  configZone = {
    displayKey: "nom", //if objects array passed which key to be displayed defaults to description
    height: "300px", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Filtrer zone', // text to be displayed when no item is selected defaults to Select,
    search: true,
    searchOnKey: "nom",
    limitTo: 25,
  };

  listStatutPaiement: any[] = [
    'Réglée',
    'Non Réglée'
  ]
  configStatutPaiement = {
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Filtrer statut pai...", // text to be displayed when no item is selected defaults to Select,
  };

  listStatut: any[] = [
    'Réglée',
    'Non Réglée'
  ]
  configStatut = {
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Filtrer statut", // text to be displayed when no item is selected defaults to Select,
  };


  constructor(
    private route: ActivatedRoute,
    private rolePermission: RolePermissionsService,
    private commandeService: CommandeService,
    private configService: Configurable,
    private utilitisService: UtilisService,
    private modalService: NgbModal,
    private modepaiementService: ModePaiementService,
    private zoneService: ZoneService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
    this.getAllModePaiement();
    this.getAllZone({
      pagination: false,
    });
    this.rolePermission.setPermission(this.infoUser);
  }

  ngOnInit(): void {
    this.objSearch = {
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
      boutiqueid: this.infoUser.body.boutique.id,
    }
    this.getAllCommandes(this.objSearch);
    this.menuItems = this.rolePermission.getMenuPermission();

    this.currentRoute = this.route.snapshot.url.join("/administration/");
    console.log("url", this.currentRoute);
    this.itemsbreadcrumb = [
      { name: "Commandes", path: "/administration/dasboard" },
      { name: "Achat", path: "/administration/dasboard" },
    ];

    this.crudPerms = {
      create: this.menuItems[1].items[0].create,
      update: this.menuItems[1].items[0].update,
      delete: this.menuItems[1].items[0].delete,
      other: this.menuItems[1].items[0].other,
    };
    console.log("====Crudperms", this.crudPerms);
    // this.getAllModePaiement();
    // this.getAllZone({
    //   pagination: false,

    // });
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  // INSERER LES DONNEES DU TABLEAU
  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    console.log("=====pageInfo", this.page);
    this.getAllCommandes(
      this.objSearch
    );
  }

  // Get all commandes
  getAllCommandes(obj) {
    this.commandeService.gettAllCommande(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.page.size = d.body.size;
            this.page.pageNumber = d.body.number;
            this.page.totalElements = d.body.totalElements;
            // this.totalPage = d.body.totalPages;
            // this.temp = d.body.content;
            if(obj.pagination){
              this.temp =d.body.content
              console.log("======CONTENT commandes paginé", d);
            }else{
              this.tempExport = d.body.content;
              console.log("======CONTENT commandes non paginé", d);
            }

        }});
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
            this.listZone = []
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

  // Get all mode de paiement
  getAllModePaiement() {
    this.modepaiementService.gettAllModePaiement().subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            let lis: any[] = [];
            lis = d.body;
            lis.map((el) => {
              this.listModePaiement.push(el);
            });
            console.log("list mode de paiement ====", this.listModePaiement);
          }
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {});
      },
    });
  }

  //EXPORTATION LISTE EN FICHIER EXCEL
  exportExcel() {
    import("xlsx").then((xlsx) => {
      // Liste
      let ledata = this.tempExport;
      let dataEnv = [];
      // let cpt = 1
      //     for(let i = 0;i<ledata.length;i++){
      //       ledata[i].nomproprietaire=ledata[i].nomproprietaire.nom
      //       ledata[i]=this.changeKeysName(ledata[i],'nomproprietaire','Nom')
      //     }

      const worksheet = xlsx.utils.json_to_sheet(ledata);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "liste_commandes");
      // this.getExport()
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  changeKeysName(test: any, OLD_KEY: any, NEW_KEY: any) {
    const { [OLD_KEY]: replaceByKey, ...rest } = test;
    const new_obj = {
      ...rest,
      [NEW_KEY]: replaceByKey,
    };

    console.log("LA LISTE TEST", new_obj);
    return new_obj;
  }

  filterzone(){
    console.log('zone search',this.zoneselect)
    if (this.zoneselect.id) {
      this.objSearch.zoneid = this.zoneselect.id
      this.getAllCommandes(this.objSearch);
    console.log('obj search',this.objSearch)
    }else{
      this.objSearch.zoneid = null
    }
    
  }
  filterModePaiement(){
    console.log('Mode de paiement',this.zoneselect)
    if (this.zoneselect.id) {
      this.objSearch.modepaiementid = this.modepaiementselect.id
    console.log('obj search',this.objSearch)
    this.getAllCommandes(this.objSearch);
    }else{
      this.objSearch.modepaiementid = null
    console.log('obj search',this.objSearch)
    } 
  }
  filterStatutPaiement(){
    console.log('statut de paiement',this.statutpaiementselect)
    if (this.statutpaiementselect) {
      this.objSearch.statutpaiement = this.statutpaiementselect
    console.log('obj search',this.objSearch)
    this.getAllCommandes(this.objSearch);
    }else{
      this.objSearch.statutpaiement = null
    console.log('obj search',this.objSearch)
    } 
  }

  filterStatut(){
    console.log('statut',this.statutselect)
    if (this.statutselect) {
      this.objSearch.statut = this.statutselect
    console.log('obj search',this.objSearch)
    this.getAllCommandes(this.objSearch);
    }else{
      this.objSearch.statut = null
    console.log('obj search',this.objSearch)
    } 
  }

  // Effacer tout les filtres
  clearFilter(){
    this.zoneselect = null
    this.statutpaiementselect = null
    this.modepaiementselect = null
    this.statutselect = null
    this.objSearch = {
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
      boutiqueid: this.infoUser.body.boutique.id,
    }
    this.getAllCommandes(this.objSearch);
  }
}

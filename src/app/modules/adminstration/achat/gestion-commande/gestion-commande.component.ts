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
import { ValiderCommandeComponent } from "./valider-commande/valider-commande.component";
import { RefuserCommandeComponent } from "./refuser-commande/refuser-commande.component";
import { EtapeLivraisonComponent } from "./etape-livraison/etape-livraison.component";
import { ReglerCommandeComponent } from "./regler-commande/regler-commande.component";
import { DetailsCommandeComponent } from "./details-commande/details-commande.component";
import { ClientService } from "src/app/shared/services/client.service";

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
  public objSearch: any;
  zoneselect: any;
  etapes: [];
  modepaiementselect: any;
  statutselect: any;
  clientselect: any;
  statutpaiementselect: any;
  commandeId: any;
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  tempExport: [];
  activeRow: any;
  rows: any[];
  closeResult: string;
  SelectionType = SelectionType;
  islivrer: boolean = true;
  page = new Page();
  listModePaiement: any[];
  configModePaiement = {
    displayKey: "nom", //if objects array passed which key to be displayed defaults to description
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Filter Mode paiement", // text to be displayed when no item is selected defaults to Select,
  };
  listZone: any[];
  configZone = {
    displayFn: (item: any) => {
      return item.nom;
    },
    displayKey: "nom", //if objects array passed which key to be displayed defaults to description
    height: "300px", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Filtrer zone", // text to be displayed when no item is selected defaults to Select,
    search: true,
  };

  listClient: any[];
  configClient = {
    displayFn: (item: any) => {
      return item.nom;
    },
    displayKey: "nom", //if objects array passed which key to be displayed defaults to description
    height: "300px", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Filtrer client", // text to be displayed when no item is selected defaults to Select,
    search: true,
  };

  listStatutPaiement: any[] = ["Réglée", "Non Réglée"];
  configStatutPaiement = {
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Filtrer statut pai...", // text to be displayed when no item is selected defaults to Select,
  };

  listStatut: any[] = ["Enregistrée", "Validée", "Annulée", "En attente"];
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
    private zoneService: ZoneService,
    private clientService: ClientService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
    this.getAllModePaiement();
    this.getAllZone({
      pagination: false,
      typezoneid: 2,
    });
    this.getAllClient({
      pagination: false,
      boutiqueid: this.infoUser.body.boutique.id,
    });
    this.rolePermission.setPermission(this.infoUser);
  }

  ngOnInit(): void {
    this.objSearch = {
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
      boutiqueid: this.infoUser.body.boutique.id,
    };
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
    // this.objSearch.page=pageInfo.offset
    // this.objSearch.size=pageInfo.size
    this.objSearch.page = this.page.pageNumber;
    this.objSearch.size = this.page.size;
    this.getAllCommandes(this.objSearch);
  }

  // OUVRIR MODALS VALIDER COMMANDE
  openValiderCommande() {
    const modalRef = this.modalService.open(ValiderCommandeComponent, {
      windowClass: "modal-mini",
      size: "sm",
      // centered: true,
    });
    modalRef.result.then(
      (result) => {
        this.closeResult = "Closed with: " + result;
        console.log("yaaaa", this.closeResult);
        if (result == "ok") {
          setTimeout(() => {
            this.getAllCommandes({
              boutiqueid: this.infoUser.body.boutique.id,
              pagination: true,
              page: 0,
              size: 10,
            });
          }, 1500);
        }
      },
      (reason) => {
        this.closeResult = "Dismissed " + this.getDismissReason(reason);
      }
    );
    modalRef.componentInstance.infoDaTa = this.activeRow;
  }

  // OUVRIR MODALS ASSIGNER PRIX LIVRAISON
  openRefuserCommande() {
    const modalRef = this.modalService.open(RefuserCommandeComponent, {
      windowClass: "modal-mini",
      size: "sm",
      // centered: true,
    });
    modalRef.result.then(
      (result) => {
        this.closeResult = "Closed with: " + result;
        console.log("yaaaa", this.closeResult);
        if (result == "ok") {
          setTimeout(() => {
            this.getAllCommandes({
              boutiqueid: this.infoUser.body.boutique.id,
              pagination: true,
              page: 0,
              size: 10,
            });
          }, 1500);
        }
      },
      (reason) => {
        this.closeResult = "Dismissed " + this.getDismissReason(reason);
      }
    );
    modalRef.componentInstance.infoDaTa = this.activeRow;
  }

  openEtapeLivraison() {
    const modalRef = this.modalService.open(EtapeLivraisonComponent, {
      windowClass: "modal-default",
      size: "lg",
      centered: true,
    });
    modalRef.result.then(
      (result) => {
        this.closeResult = "Closed with: " + result;
        console.log("yaaaa", this.closeResult);
        if (result == "ok") {
          setTimeout(() => {
            this.getAllCommandes({
              boutiqueid: this.infoUser.body.boutique.id,
              pagination: true,
              page: 0,
              size: 10,
            });
          }, 1500);
        }
      },
      (reason) => {
        this.closeResult = "Dismissed " + this.getDismissReason(reason);
      }
    );
    modalRef.componentInstance.infoDaTa = this.activeRow;
  }
  openPayementCommande() {
    const modalRef = this.modalService.open(ReglerCommandeComponent, {
      windowClass: "modal-mini",
      size: "sm",
      // centered: true,
    });
    modalRef.result.then(
      (result) => {
        this.closeResult = "Closed with: " + result;
        console.log("yaaaa", this.closeResult);
        if (result == "ok") {
          setTimeout(() => {
            this.getAllCommandes({
              boutiqueid: this.infoUser.body.boutique.id,
              pagination: true,
              page: 0,
              size: 10,
            });
          }, 1500);
        }
      },
      (reason) => {
        this.closeResult = "Dismissed " + this.getDismissReason(reason);
      }
    );
    modalRef.componentInstance.infoDaTa = this.activeRow;
  }

  openDetailProduit() {
    const modalRef = this.modalService.open(DetailsCommandeComponent, {
      windowClass: "modal-mini",
      size: "lg",
      // centered: true,
    });
    modalRef.result.then(
      (result) => {
        this.closeResult = "Closed with: " + result;
        console.log("yaaaa", this.closeResult);
        if (result == "ok") {
          setTimeout(() => {
            this.getAllCommandes({
              boutiqueid: this.infoUser.body.boutique.id,
              pagination: true,
              page: 0,
              size: 10,
            });
          }, 1500);
        }
      },
      (reason) => {
        this.closeResult = "Dismissed " + this.getDismissReason(reason);
      }
    );
    modalRef.componentInstance.infoDaTa = this.activeRow;
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
            if (obj.pagination) {
              this.temp = d.body.content;
              console.log("======CONTENT commandes paginé", d);
            }
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

  // Get all mode de paiement
  getAllModePaiement() {
    this.modepaiementService.gettAllModePaiement().subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            let lis: any[] = [];
            this.listModePaiement = [];
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

  getFichierCommande() {
    this.objSearch.pagination = false;
    this.commandeService.gettAllCommande(this.objSearch).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.tempExport = [];
            this.tempExport = d.body;
            console.log("======CONTENT commandes paginé", d);
            this.exportExcel();
            this.objSearch.pagination = true;
            this.getAllCommandes(this.objSearch);
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
      let ledata = [];
      ledata = this.tempExport;
      console.log("data", this.tempExport);
      let dataEnv = [];
      let cpt = 1;
      // let cpt = 1
      //     for(let i = 0;i<ledata.length;i++){
      //       ledata[i].nomproprietaire=ledata[i].nomproprietaire.nom
      //       ledata[i]=this.changeKeysName(ledata[i],'nomproprietaire','Nom')
      //     }

      // for (let i = 0; i < ledata.length; i++) {
      //   ledata[i] = this.changeKeysName(
      //     ledata[i],
      //     "id",
      //     "ID"
      //   );
      //   ledata[i] = this.changeKeysName(
      //     ledata[i],
      //     "code",
      //     "Code"
      //   );
      //   ledata[i] = this.changeKeysName(ledata[i], "montant", "Montant");
      //   ledata[i] = this.changeKeysName(ledata[i], "montantlivraison", "Montant livraison");
      //   ledata[i] = this.changeKeysName(ledata[i], "montanttotal", "Montant total");
      //   ledata[i] = this.changeKeysName(ledata[i], "tauxcodepromo", "Taux code promo");
      //   ledata[i] = this.changeKeysName(ledata[i], "datecreation", "Date de création");
      //   ledata[i] = this.changeKeysName(ledata[i], "statut", "Statut");
      //   ledata[i].contact = "+225" + ledata[i].contact;
      //   ledata[i] = this.changeKeysName(ledata[i], "contact", "Contact");
      //   ledata[i] = this.changeKeysName(
      //     ledata[i],
      //     "statutpaiement",
      //     "Statut de paiement"
      //   );
      //   ledata[i] = this.changeKeysName(ledata[i], "operateur", "Opérateur");
      //   var leclient= ledata[i].adresse
      //   ledata[i]=leclient.nom
      //   // var leadresse= ledata[i].adresse
      //   // ledata[i]=leadresse.nom

      //   var lepanierObjet = ledata[i].panierObjectList;
      //   // var letypecuisine = ledata[i].typescuisines;
      //   if (lepanierObjet && lepanierObjet.length) {
      //     for (let e = 0; e < lepanierObjet.length; e++) {
      //       ledata[i].produit = lepanierObjet[e].produit.nom;
      //       // ledata[i].salaire = lepanierObjet[e].salaire;
      //       ledata[i] = this.changeKeysName(
      //         ledata[i],
      //         "metier",
      //         "Metier " + cpt
      //       );
      //       // ledata[i] = this.changeKeysName(
      //       //   ledata[i],
      //       //   "salaire",
      //       //   "Salaire " + cpt
      //       // );
      //       cpt++;
      //     }
      //     // for (let s = 0; s < letypecuisine.length; s++) {
      //     //   var cpt2 = s + 1;
      //     //   ledata[i].typecuisine = letypecuisine[s];
      //     //   ledata[i] = this.changeKeysName(
      //     //     ledata[i],
      //     //     "typecuisine",
      //     //     "Type cuisine " + cpt2
      //     //   );
      //     //   cpt++;
      //     // }
      //   }

      //   cpt = 1;

      //   // delete ledata[i].metiers;
      //   // delete ledata[i].typescuisines;
      // }

      let produits: string = "";
      for (let i = 0; i < ledata.length; i++) {
        ledata[i] = this.changeKeysName(ledata[i], "id", "ID");
        ledata[i].client = ledata[i].client.nom;
        ledata[i] = this.changeKeysName(ledata[i], "client", "Client");
        ledata[i] = this.changeKeysName(ledata[i], "code", "Code");
        ledata[i] = this.changeKeysName(ledata[i], "montant", "Montant");
        ledata[i] = this.changeKeysName(
          ledata[i],
          "montantlivraison",
          "Montant livraison"
        );
        ledata[i] = this.changeKeysName(
          ledata[i],
          "montanttotal",
          "Montant total"
        );
        ledata[i] = this.changeKeysName(ledata[i], "statut", "Statut");
        ledata[i] = this.changeKeysName(
          ledata[i],
          "statutpaiement",
          "Statut paiement"
        );
        ledata[i] = this.changeKeysName(
          ledata[i],
          "tauxcodepromo",
          "Taux code promo"
        );
        ledata[i].adresse =
          ledata[i].adresse.nom + ", " + ledata[i].adresse.description;
        var lepanierObjet = ledata[i].panierObjectList;
        // var letypecuisine = ledata[i].typescuisines;
        if (lepanierObjet && lepanierObjet.length) {
          produits = "";
          for (let e = 0; e < lepanierObjet.length; e++) {
            produits = produits + lepanierObjet[e].produit.nom + "; ";
          }
        }
        ledata[i].panierObjectList = produits;
        ledata[i] = this.changeKeysName(
          ledata[i],
          "panierObjectList",
          "Panier"
        );
        ledata[i] = this.changeKeysName(ledata[i], "adresse", "Adresse");
        ledata[i] = this.changeKeysName(
          ledata[i],
          "datecreation",
          "Date création"
        );
        ledata[i] = this.changeKeysName(
          ledata[i],
          "datelivraison",
          "Date livraison"
        );
        ledata[i] = this.changeKeysName(
          ledata[i],
          "modepaiement",
          "Mode paiement"
        );
        ledata[i] = this.changeKeysName(ledata[i], "operateur", "Opératreur");
        ledata[i] = this.changeKeysName(ledata[i], "contact", "Contact");
        ledata[i].etape = ledata[i].etape.nom;
        ledata[i] = this.changeKeysName(ledata[i], "etape", "Étape");
        ledata[i] = this.changeKeysName(ledata[i], "promotion", "Promotion");
      }

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

  filterzone() {
    console.log("zone search", this.zoneselect);
    if (this.zoneselect.zone) {
      this.objSearch.zoneid = this.zoneselect.zone.id;
      this.getAllCommandes(this.objSearch);
      console.log("obj search", this.objSearch);
    } else {
      this.objSearch.zoneid = "";
      this.getAllCommandes(this.objSearch);
    }
  }
  filterModePaiement() {
    console.log("Mode de paiement", this.zoneselect);
    if (this.modepaiementselect.id) {
      this.objSearch.modepaiementid = this.modepaiementselect.id;
      console.log("obj search", this.objSearch);
      this.getAllCommandes(this.objSearch);
    } else {
      this.objSearch.modepaiementid = "";
      this.getAllCommandes(this.objSearch);
      console.log("obj search", this.objSearch);
    }
  }
  filterStatutPaiement() {
    console.log("statut de paiement", this.statutpaiementselect);
    if (this.statutpaiementselect) {
      this.objSearch.statutpaiement = this.statutpaiementselect;
      console.log("obj search", this.objSearch);
      this.getAllCommandes(this.objSearch);
    } else {
      this.objSearch.statutpaiement = "";
      this.getAllCommandes(this.objSearch);
      console.log("obj search", this.objSearch);
    }
  }

  filterClient() {
    console.log("client", this.clientselect);
    if (this.clientselect.length != 0 && this.clientselect != undefined) {
      this.objSearch.clientid = this.clientselect.id;
      console.log("obj search", this.objSearch);
      this.getAllCommandes(this.objSearch);
    } else {
      this.objSearch.clientid = "";
      this.getAllCommandes(this.objSearch);
      console.log("obj search", this.objSearch);
    }
  }

  filterStatut() {
    console.log("statut", this.statutselect);
    if (this.statutselect) {
      this.objSearch.statut = this.statutselect;
      console.log("obj search", this.objSearch);
      this.getAllCommandes(this.objSearch);
    } else {
      this.objSearch.statut = "";
      this.getAllCommandes(this.objSearch);
      console.log("obj search", this.objSearch);
    }
  }

  // Effacer tout les filtres
  clearFilter() {
    this.zoneselect = null;
    this.statutpaiementselect = null;
    this.modepaiementselect = null;
    this.statutselect = null;
    this.objSearch = {
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
      boutiqueid: this.infoUser.body.boutique.id,
    };
    this.getAllCommandes(this.objSearch);
  }

  getCellClass({ row, column, value }): any {
    return "totalAmount";
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return "with: $reason";
    }
  }

  consulterEtapeCommande() {
    this.commandeService.consulterEtapeCommande(this.activeRow.id).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          if (data.status == 200) {
            console.log("======commande valider avec Success", d);
            this.etapes = [];
            this.etapes = d.body;
            console.log("etape", this.etapes);

            this.etapes.map((el: any) => {
              if (el.etape.id == 4 && el.date) {
                this.islivrer = true;
              }
            });
          } else {
            console.log("======la commande n'a pas pu être valider", d);
          }
        });
      },
    });
  }

  // Rechercher le nom du produit avec le input
  onsearchCommande(event) {
    if (!event) {
      this.objSearch.achatid = null;
      this.getAllCommandes(this.objSearch);
    } else {
      this.objSearch.achatid = this.commandeId;
      this.getAllCommandes(this.objSearch);
    }
  }

  // exportExcel() {
  //   import("xlsx").then((xlsx) => {
  //     let ledata = this.listExport;
  //     let dataEnv = [];
  //     let cpt = 1;
  //     for (let i = 0; i < ledata.length; i++) {
  //       ledata[i] = this.changeKeysName(
  //         ledata[i],
  //         "numeromatricule",
  //         "Numero matricule"
  //       );
  //       ledata[i] = this.changeKeysName(ledata[i], "nom", "Nom");
  //       ledata[i] = this.changeKeysName(ledata[i], "prenoms", "Prenoms");
  //       ledata[i] = this.changeKeysName(ledata[i], "genre", "Genre");
  //       ledata[i].contact = "+" + ledata[i].contact;
  //       ledata[i] = this.changeKeysName(ledata[i], "contact", "Contact");
  //       ledata[i] = this.changeKeysName(
  //         ledata[i],
  //         "lieuhabitation",
  //         "Lieu habitation"
  //       );
  //       ledata[i] = this.changeKeysName(ledata[i], "email", "Email");
  //       ledata[i] = this.changeKeysName(ledata[i], "ethnie", "Ethnie");
  //       ledata[i] = this.changeKeysName(
  //         ledata[i],
  //         "niveauetude",
  //         "Niveau etude"
  //       );

  //       var lemetier = ledata[i].metiers;
  //       var letypecuisine = ledata[i].typescuisines;
  //       if (lemetier && lemetier.length) {
  //         for (let e = 0; e < lemetier.length; e++) {
  //           ledata[i].metier = lemetier[e].metier;
  //           ledata[i].salaire = lemetier[e].salaire;
  //           ledata[i] = this.changeKeysName(
  //             ledata[i],
  //             "metier",
  //             "Metier " + cpt
  //           );
  //           ledata[i] = this.changeKeysName(
  //             ledata[i],
  //             "salaire",
  //             "Salaire " + cpt
  //           );
  //           cpt++;
  //         }
  //         for (let s = 0; s < letypecuisine.length; s++) {
  //           var cpt2 = s + 1;
  //           ledata[i].typecuisine = letypecuisine[s];
  //           ledata[i] = this.changeKeysName(
  //             ledata[i],
  //             "typecuisine",
  //             "Type cuisine " + cpt2
  //           );
  //           cpt++;
  //         }
  //       }

  //       cpt = 1;

  //       delete ledata[i].metiers;
  //       delete ledata[i].typescuisines;
  //     }

  //     const worksheet = xlsx.utils.json_to_sheet(ledata);
  //     const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  //     const excelBuffer: any = xlsx.write(workbook, {
  //       bookType: "xlsx",
  //       type: "array",
  //     });
  //     this.saveAsExcelFile(excelBuffer, "rapport_agents");
  //     this.getExport();
  //   });
  // }

  selectionChanged(event) {
    // console.log('event',event.value)
  }

  searchChange(event) {
    // console.log('event',event)
    // this.listZone=this.listZone.filter(item=>{
    //   return item.zone.nom.toLowerCase().indexOf(event)!==-1
    // })
    // this.getAllZone({
    //   nom: event,
    //   pagination: false,
    // })
  }

  getAllClient(obj) {
    this.clientService.gettAllClient(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.listClient = [];
            let lis: any[] = [];
            lis = d.body;
            lis.map((el) => {
              this.listClient.push(el);
            });
            console.log("list des clients ====", this.listClient);
          }
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {});
      },
    });
  }
}

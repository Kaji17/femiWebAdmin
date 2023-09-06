import { Component, OnDestroy, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SelectionType } from "@swimlane/ngx-datatable";
import { Subscription } from "rxjs";
import { Page } from "src/app/shared/model/paged";
import { BreadcrumbService } from "src/app/shared/services/breadcrumb.service";
import * as FileSaver from "file-saver";
import { RolePermissionsService } from "src/app/shared/services/role-permissions.service";
import { ClientService } from "src/app/shared/services/client.service";
import { UtilisService } from "src/app/shared/services/utilis.service";

@Component({
  selector: "app-gestion-clients",
  templateUrl: "./gestion-clients.component.html",
  styleUrls: ["./gestion-clients.component.scss"],
})
export class GestionClientsComponent implements OnInit, OnDestroy {
  public focus;
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  tempExport: []
  activeRow: any;
  rows: any[];
  closeResult: string;
  page = new Page();
  infoUser:any

  itemselected: number;
  public listProduitSelect = ['bonjour'];
  public crudPerms: any;
  public menuItems: any[];

  SelectionType = SelectionType;
  constructor(
    private service: BreadcrumbService,
    private modalService: NgbModal,
    private rolePermission: RolePermissionsService,
    private clientService: ClientService,
    private utilitisService: UtilisService,

  ) {
    this.page.pageNumber = 0;
    this.page.size = 20;
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
  }

  public SuscribeAllData: Subscription;
  ngOnDestroy(): void {
    // this.SuscribeAllData.unsubscribe;
  }
  ngOnInit(): void {
    this.getAllClient({
      pagination:true,
      page: this.page.pageNumber,
      size: this.page.size,
      boutiqueid: this.infoUser.body.boutique.id,

    })
    this.menuItems = this.rolePermission.getMenuPermission();

    this.crudPerms = {
      create: this.menuItems[5].items[1].create,
      update: this.menuItems[5].items[1].update,
      delete: this.menuItems[5].items[1].delete,
    };
    let currentMultipleFile = undefined;
    this.itemselected = 2;
    // multiple dropzone file - accepts any type of file
  }

  onAddProduit() {
    console.log("Ajout effectuer");
  }
  onUpdateProduit() {
    console.log("modification effectuer");
  }
  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    console.log("=====pageInfo", this.page);
    this.getAllClient({
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
      boutiqueid: this.infoUser.body.boutique.id,
    });
  }

  onSelect({ selected }) {
    console.log("Select Event", selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    console.log("hhh", this.selected);
  }

  displayCheck(row) {
    return row.name !== "Ethel Price";
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

  open(content, type, modalDimension) {
    if (modalDimension === "sm" && type === "modal_mini") {
      this.modalService
        .open(content, {
          windowClass: "modal-mini",
          size: "sm",
          centered: true,
        })
        .result.then(
          (result) => {
            this.closeResult = "Closed with: " + result;
          },
          (reason) => {
            this.closeResult = "Dismissed " + this.getDismissReason(reason);
          }
        );
    } else if (modalDimension === "" && type === "Notification") {
      this.modalService
        .open(content, { windowClass: "modal-danger", centered: true })
        .result.then(
          (result) => {
            this.closeResult = "Closed with: " + result;
          },
          (reason) => {
            this.closeResult = "Dismissed " + this.getDismissReason(reason);
          }
        );
    } else {
      this.modalService.open(content, { centered: true }).result.then(
        (result) => {
          this.closeResult = "Closed with: " + result;
        },
        (reason) => {
          this.closeResult = "Dismissed " + this.getDismissReason(reason);
        }
      );
    }
  }


  onAddNewPromotionShow(nbr: number) {
    this.itemselected = nbr;
  }

  onAddNewPromotion(nbr: number) {
    console.log("Promotion Créer");
  }

  onAttibutePromotion() {
    console.log("Promotion attribuer");
  }

  getFichierClient() {
    this.clientService.gettAllClient({
      pagination:false,
      boutiqueid: this.infoUser.body.boutique.id,

    }).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.tempExport = [];
            this.tempExport = d.body;
            console.log("======CONTENT client exporter", d);
            this.exportExcel();
            
            this.getAllClient({
              pagination: true,
              page: this.page.pageNumber,
              size: this.page.size,
              boutiqueid: this.infoUser.body.boutique.id,
            });
          }
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {});
      },
    });
  }
  // Get all commandes
  getAllClient(obj) {
    this.clientService.gettAllClient(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log(d);
          if (data.status == 200) {
            this.page.size = d.body.size;
            this.page.pageNumber = d.body.number;
            this.page.totalElements = d.body.totalElements;
            // this.totalPage = d.body.totalPages;
            this.temp = d.body.content;
            // if (obj.pagination) {
            //   this.temp = d.body.content;
            //   console.log("======CONTENT commandes paginé", d);
            // }
          }
        });
      },
      error: (error) => {
        this.utilitisService.response(error, (d: any) => {});
      },
    });
  }

  onExportData() {}

  //
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
      this.saveAsExcelFile(excelBuffer, "liste_client");
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

    // console.log('LA LISTE TEST',new_obj)
    return new_obj;
  }
  //
}

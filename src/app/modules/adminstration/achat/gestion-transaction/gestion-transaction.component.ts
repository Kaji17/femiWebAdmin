import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/shared/model/paged';
import { RolePermissionsService } from 'src/app/shared/services/role-permissions.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { UtilisService } from 'src/app/shared/services/utilis.service';
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-gestion-transaction',
  templateUrl: './gestion-transaction.component.html',
  styleUrls: ['./gestion-transaction.component.scss']
})
export class GestionTransactionComponent implements OnInit {

  public infoUser: any;
  public crudPerms: any
  public menuItems: any[];
  temp = [];
  tempExport: []
  activeRow:any

  page = new Page()

  constructor(
    private rolePermission: RolePermissionsService,
    private transactionService: TransactionService,
    private utilitisService: UtilisService,

  ) { 
    this.page.pageNumber = 0;
    this.page.size = 20;
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));

  }

  ngOnInit(): void {
    this.menuItems=this.rolePermission.getMenuPermission()

    this.crudPerms = {
      create: this.menuItems[1].items[1].create,
      update: this.menuItems[1].items[1].update,
      delete: this.menuItems[1].items[1].delete,
    };
    this.getAllAchat({
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
      boutiqueid: this.infoUser.body.boutique.id,
    });

  }
  onActivate(event) {
    this.activeRow = event.row;
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    console.log("=====pageInfo", this.page);
    this.getAllAchat({
      pagination: true,
      page: this.page.pageNumber,
      size: this.page.size,
      boutiqueid: this.infoUser.body.boutique.id,
    });
  }

  getAllAchat(obj){
    this.transactionService.gettAllTransaction(obj).subscribe({
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


  getFichierTransaction() {
    this.transactionService.gettAllTransaction({
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
            
            this.getAllAchat({
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


  //EXPORTATION LISTE EN FICHIER EXCEL
  exportExcel() {
    import("xlsx").then((xlsx) => {
      // Liste
      let ledata = [];
      ledata = this.tempExport;
      console.log("data", this.tempExport);
      let dataEnv = [];
      const worksheet = xlsx.utils.json_to_sheet(ledata);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "liste_transactions");
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

}

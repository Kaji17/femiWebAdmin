import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SelectionType } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { Page } from 'src/app/shared/model/page';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { RolePermissionsService } from 'src/app/shared/services/role-permissions.service';

@Component({
  selector: 'app-gestion-type-pack',
  templateUrl: './gestion-type-pack.component.html',
  styleUrls: ['./gestion-type-pack.component.scss']
})
export class GestionTypePackComponent implements OnInit,OnDestroy {

  public focus;
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any[];
  closeResult: string;
  public crudPerms: any;
  public menuItems: any[];

  SelectionType = SelectionType;
  constructor(
    private service: BreadcrumbService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private rolePermission: RolePermissionsService,

  ) {
    // this.page.pageNumber = 0;
    // this.page.size = 10;
  }

  page = new Page();

  @ViewChild('dropzone', { static: true }) dropzoneElement: ElementRef;


  public SuscribeAllData: Subscription;
  ngOnDestroy(): void {
    this.SuscribeAllData.unsubscribe;
  }
  ngOnInit(): void {
    this.menuItems = this.rolePermission.getMenuPermission();
    let currentMultipleFile = undefined;
    this.crudPerms = {
      create: this.menuItems[3].items[4].create,
      update: this.menuItems[3].items[4].update,
      delete: this.menuItems[3].items[4].delete,
    };
    // multiple dropzone file - accepts any type of file
  }

  onAddTypepack() {
    console.log("Ajout type pack effectuer");
  }
  onUpdateTypePack() {
    console.log("modification type pack effectuer");
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
  //   onSelect({selected}) {
  //     this.selected.splice(0, this.selected.length);
  //     this.selected.push(...selected);
  //  }
  onActivate(event) {
    this.activeRow = event.row;
  }

  setPage(pageInfo) {
    this.SuscribeAllData=this.service.getApi({ page: pageInfo.offset + 1 }).subscribe({
      next: (value) => {
        // this.page.pageNumber = pageInfo.offset;
        // this.page.size = 20;
        // this.page.totalElements = value.count;
        // this.page.totalPages = 9;
        console.log("Appel Api", value.results);
        this.temp = value.results;
      },
    });
    this.temp = this.temp.map((prop, key) => {
      return {
        ...prop,
        id: key,
        homeworld: prop.homeworld, // Remplacez par l'URL réelle de l'image pour chaque élément
      };
    });
  }
  getImage(): string[] {
    return this.rows.map((row) => row.films);
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

  close() {
    this.modalService.dismissAll(this.closeResult);
  }

  ontet() {
    console.log("vilain  ca marche pas");
  }
  @ViewChild("content", { static: true }) modalContent: TemplateRef<any>;
  private modalRef: NgbModalRef;

  openModal() {
    this.modalRef = this.modalService.open(this.modalContent);
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  onDeleteTypePack(id: number) {
    console.log("type pack supprimer");
  }

}

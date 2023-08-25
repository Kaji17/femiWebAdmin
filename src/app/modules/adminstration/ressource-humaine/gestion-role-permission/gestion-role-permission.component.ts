import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SelectionType } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { Page } from 'src/app/shared/model/page';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { NavConstants } from 'src/app/constants/nav.const';
import { Nav2Constants } from 'src/app/constants/nav2.const';
import {NavItems, navAdminItems}from 'src/app/constants/_nav'
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoleModalComponent } from './role-modal/role-modal.component';


@Component({
  selector: 'app-gestion-role-permission',
  templateUrl: './gestion-role-permission.component.html',
  styleUrls: ['./gestion-role-permission.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GestionRolePermissionComponent implements OnInit {

  public focus;
  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any[]
  public menuItems: any[];

  closeResult: string;
  isExpandedd2: boolean = true;

  SelectionType = SelectionType;
  constructor(
    private service: BreadcrumbService,
    private modalService: NgbModal,
    private fb: FormBuilder

  ) {
    // this.page.pageNumber = 0;
    this.page.size = 10;
  }

  page = new Page();

  // 
  permForm: FormGroup
  file: any[] =[]
  cols = [
    { field: 'disabled', header: 'Désactiver' },
    { field: 'id', header: 'Full' },
    { field: 'create', header: 'Create' },
    { field: 'update', header: 'Update' },
    { field: 'delete', header: 'Delete' },
    { field: 'other', header: 'Other' },
  ];

  public SuscribeAllData: Subscription;
  ngOnDestroy(): void {
    this.SuscribeAllData.unsubscribe;
  }
  ngOnInit(): void {
    this.setPage({ offset: 0 });
    this.menuItems = Nav2Constants
    this.file = this.buildTableNodes(navAdminItems)
console.log('Bonjour')
  }

  // Méthode d'ajout nouvelle catégorie de  produit
  onAddCategorieProduit() {
    console.log("Ajout catégorie effectuer");
  }

  // Méthode de modification catégorie de  produit
  onUpdateCategorieProduit() {
    console.log("modification catégorie effectuer");
  }

  // Méthode de filtrage de la table 
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

  // Méthode d'ajout d'élément dans le tableau
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

  // Méthode d'ajout a la liste d'élément selectionner
  onSelect({ selected }) {
    console.log("Select Event", selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    console.log("hhh", this.selected);
  }

  displayCheck(row) {
    return row.name !== "Ethel Price";
  }

  // Méthode pour fermer les modals 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return "with: $reason";
    }
  }

  // Méthode pour faire apparaitre les différents modals
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
      this.modalService.open(RoleModalComponent, { centered: true, size: 'lg' }).result.then(
        (result) => {
          this.closeResult = "Closed with: " + result;
        },
        (reason) => {
          this.closeResult = "Dismissed " + this.getDismissReason(reason);
        }
      );
    }
  }

  // close() {
  //   this.modalService.dismissAll(this.closeResult);
  // }

  // ontet() {
  //   console.log("vilain  ca marche pas");
  // }


  // Méthode pour suuprimer une catégorie  de produit
  onDeleteCategorieProduit(id: number) {
    console.log("produits supprimer");
  }


  expanded: any = {};
  @ViewChild('myTable') table: any;

  
  toggleExpansion(index) {
    this.menuItems[index].isExpandedd2 = !this.menuItems[index].isExpandedd2;
  }

  buildTableNodes(nav: NavItems[], selectedNav?:any) {
    this.file=[]
    let retArr: any[] = [];
    // 
    nav.map((menu, index) => {
     
      let obj: any = {};
      obj['title'] = menu.title
      let node: any = {
        title: menu.title,
        create: false,
        update: false,
        delete: false,
        other: false,
        id: false,
        
      };

      if (menu.url) {
        node['url'] = menu.url;
      }

      if(menu.disabled==true || menu.disabled==false){
        node['disabled']=menu.disabled
      }

      if (menu.children) {      
        obj['children'] = this.buildTableNodes(menu.children);
      }

      obj['data'] = node;
      if(menu.title=="Gestion des Utilisateurs"){}
      retArr.push(obj);
    });
    // 
    return retArr;
  }

  verif(val: any, col: string | number, row: any, subRow: { node: { children: any[]; }; }) {
    if (subRow && subRow.node.children) {
      subRow.node.children = subRow.node.children.map((obj) => {
        obj.data[col] = val;
       console.log('=obj=',obj)
       if(obj.children){
       }
        return obj;
      });
    }
    ;
    // this.permForm.controls['roledescription'].setValue(this.file);
  }


}

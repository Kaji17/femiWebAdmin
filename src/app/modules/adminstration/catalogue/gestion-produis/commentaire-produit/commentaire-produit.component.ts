import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Configurable } from 'src/app/core/config';
import { ProduitService } from 'src/app/shared/services/produit.service';
import { UtilisService } from 'src/app/shared/services/utilis.service';

@Component({
  selector: 'app-commentaire-produit',
  templateUrl: './commentaire-produit.component.html',
  styleUrls: ['./commentaire-produit.component.scss']
})
export class CommentaireProduitComponent implements OnInit, AfterViewInit {

  
  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;

  @Input()produitSelect
  rows:[]
  columns = [];

  ColumnMode = ColumnMode;

  constructor(
    public activeModal: NgbActiveModal,
    config: NgbRatingConfig,
    private configService: Configurable,
    private utilitisService: UtilisService,
    private produitService: ProduitService
  ) { 
    config.max = 5;
		config.readonly = true;
  }
  ngAfterViewInit(): void {
    console.log("afterinit")
   this.getAvisProduit(this.produitSelect.id)

  }

  ngOnInit(): void {
    console.log(this.produitSelect);
    
    this.columns = [
      {
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        name: 'Gender'
      }
    ];

  }

    // Fermer le modal
    closeModal() {
      this.activeModal.close();
    }
  
    getImg(src: string) {
      if (src) {
        return src.replace(
          this.configService.get("imgVar"),
          this.configService.get("imgHttp")
        ) as any;
      }
    }

    getAvisProduit(id:number){
      this.produitService.getAvisProduit(id).subscribe({
        next: (data) => {
          this.utilitisService.response(data, (d: any) => {
            console.log(d);
            if (data.status == 200) {
              // this.totalPage = d.body.totalPages;
              this.rows = d.body;
              console.log("tab", this.rows)
            }
          });
        },
        error: (error) => {
          this.utilitisService.response(error, (d: any) => {});
        },
      });
    }


}

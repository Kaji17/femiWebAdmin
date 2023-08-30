
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Configurable } from 'src/app/core/config';
import { ProduitService } from 'src/app/shared/services/produit.service';
import { UtilisService } from 'src/app/shared/services/utilis.service';

@Component({
  selector: 'app-create-produit',
  templateUrl: './create-produit.component.html',
  styleUrls: ['./create-produit.component.scss']
})
export class CreateProduitComponent implements OnInit {
  @Input() name;
  @Input() data;
  @Input() btnMsgVal;
  @Input() btnMsgDeny;
  dataRecover:any={}
  loading: boolean;
  lurl: any;
  constructor(
    public activeModal: NgbActiveModal,
    public produitService : ProduitService,
    public utilisService: UtilisService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private configService: Configurable,
  ) { }

  ngOnInit(): void {
    if(this.data){
      this.dataRecover=JSON.parse(this.data)
      if(this.dataRecover?.imageproduits.length){
        this.lurl=this.dataRecover.imageproduits[0].url
      }
     
      console.log(this.dataRecover)
    }

  }

  handleVal(){this.handleValidation(this.dataRecover)}
  handleDen(){this.handleDeny(this.dataRecover)}

  handleValidation(obj:any){
    // this.dataSet = [];
    this.loading=true
    // this.produitService.validate(obj).subscribe({
    //   next: (data) => {
    //     this.utilisService.response(data, (d:any) => {
    //       this.loading=false
    //       console.log(d)
          
    //         this.toastr.success('Produit validé!', 'Succès');
    //         this.activeModal.close('')
           
          
         
    //       // this.dataSet=d;
    //     });
    //   },
    //   error: (error) => {
    //     this.utilisService.response(error,(d:any)=>{
    //       this.loading=false
    //       this.toastr.error('Problème lors de la validation veuillez recommencer!', 'Erreur');
          
    //     })
    //   }
    // });
  }

  handleDeny(obj:any){
    // this.dataSet = [];
    this.loading=true
    // this.produitService.deny(obj).subscribe({
    //   next: (data) => {
    //     this.utilisService.response(data, (d:any) => {
    //       this.loading=false
    //       console.log(d)
          
    //         this.toastr.success('Produit refusé!', 'Succès');
    //         this.activeModal.close('')
           
          
         
    //       // this.dataSet=d;
    //     });
    //   },
    //   error: (error) => {
    //     this.utilisService.response(error,(d:any)=>{
    //       this.loading=false
    //       this.toastr.error('Problème lors du refus veuillez recommencer!', 'Erreur');
          
    //     })
    //   }
    // });
  }

  getImg(src:string) {
    if(src){ return src.replace(this.configService.get('imgVar'), this.configService.get('imgHttp')) as any}
  }

  clicSurImg(lurl){
    this.lurl=lurl
  }

}

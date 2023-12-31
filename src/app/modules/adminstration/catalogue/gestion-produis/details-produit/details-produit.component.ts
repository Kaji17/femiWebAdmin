import {
  Component,
  Input,
  OnInit
} from "@angular/core";
import {
  NgbActiveModal
} from "@ng-bootstrap/ng-bootstrap";
import { Configurable } from "src/app/core/config";
import { ProduitService } from "src/app/shared/services/produit.service";
import { UtilisService } from "src/app/shared/services/utilis.service";

@Component({
  selector: "app-details-produit",
  templateUrl: "./details-produit.component.html",
  styleUrls: ["./details-produit.component.scss"],
})
export class DetailsProduitComponent implements OnInit {
  dataRecover: any = {};
  loading: boolean;
  @Input() produitSelect;
  myThumbnail:string = 'assets/img/undraw_Images_re_0kll.png'
  lurl: any;
  constructor(
    public activeModal: NgbActiveModal,
    public produitService: ProduitService,
    public utilisService: UtilisService,
    private configService: Configurable
  ) {}

  ngOnInit(): void {
    // if(this.data){
    //   this.dataRecover=JSON.parse(this.data)
    //   if(this.dataRecover?.imageproduits.length){
    //     this.lurl=this.dataRecover.imageproduits[0].url
    //   }

    //   console.log(this.dataRecover)
    // }
    console.log("---produit selected", this.produitSelect);
    this.lurl=this.produitSelect.imageproduits[0].url
  }

  getImg(src: string) {
    if (src) {
      return src.replace(
        this.configService.get("imgVar"),
        this.configService.get("imgHttp")
      ) as any;
    }
  }

  clicSurImg(lurl) {
    this.lurl = lurl;
  }
}

import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CommandeService } from "src/app/shared/services/commande.service";
import { UtilisService } from "src/app/shared/services/utilis.service";

@Component({
  selector: "app-etape-livraison",
  templateUrl: "./etape-livraison.component.html",
  styleUrls: ["./etape-livraison.component.scss"],
})
export class EtapeLivraisonComponent implements OnInit, AfterViewInit {
  @Input() infoDaTa;
  public etapes: [];
  public index:number=1
  islivrer: boolean=false
  constructor(
    public activeModal: NgbActiveModal,
    private utilitisService: UtilisService,
    private commandeService: CommandeService
  ) {}
  ngAfterViewInit(): void {
    this.consulterEtapeCommande();
  }

  ngOnInit(): void {
    console.log("info", this.infoDaTa);
  }

  // Fermer le modal
  closeModal() {
    this.activeModal.close();
  }

  closeModalOk() {
    this.activeModal.close("ok");
  }

  consulterEtapeCommande() {
    this.commandeService.consulterEtapeCommande(this.infoDaTa.id).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          if (data.status == 200) {
            console.log("======commande valider avec Success", d);
            this.etapes = [];
            this.etapes = d.body;
            console.log("etape", this.etapes);

            this.etapes.map((el:any)=>{
              
              if(el.etape.id==4&&el.date){
                this.islivrer=true
              }
            })
            this.etapes.sort(function(a:any,b:any){
              return a.etape.niveau-b.etape.niveau
            })
            console.log("etape2", this.etapes);
          } else {
            console.log("======la commande n'a pas pu être valider", d);
          }
        });
      },
    });
  }

  handleOk(){
    this.getIdNextStep()
    console.log('n',this.index)
    this.commandeService.modifierEtapeCommande(this.infoDaTa.id, this.index).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          if (data.status == 200) {
            console.log("======l'étape de la commande à été modifier avec Success", d);
          } else {
            console.log("======l'étape de la commande n'à pas été modifier", d);
          }
        });
      },
    });
  }
  getIdNextStep(): any {
    for (const e of this.etapes) {
      let obj: any = e;
      if (!obj.date) {
        
        return this.index = obj.etape.id;
      }
    };
    console.log("Id====next step", this.index)
  }
}

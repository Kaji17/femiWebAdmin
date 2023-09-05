import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilisService } from 'src/app/shared/services/utilis.service';

@Component({
  selector: 'app-details-commande',
  templateUrl: './details-commande.component.html',
  styleUrls: ['./details-commande.component.scss']
})
export class DetailsCommandeComponent implements OnInit {

  @Input() infoDaTa;
  constructor(
    public activeModal: NgbActiveModal,
    private utilitisService: UtilisService,
  ) { }

  ngOnInit(): void {
  }

    // Fermer le modal
    closeModal() {
      this.activeModal.close();
    }
  
    closeModalOk() {
      this.activeModal.close("ok");
    }

}

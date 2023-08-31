import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.scss']
})
export class DetailsProduitComponent implements OnInit {

  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;

  rows = [
    {
      commentaire: 'lorem kdkamdklmfalskmlksdmflamfalkmflsdkmfmglmglnlkmdlkmfklamlkmlksdmkle',
      note: 3,
      nom: 'client',
      date: 'il y a deux mois'
    },
    {
      commentaire: 'Yooooo la cité kdkamdklmfalskmlksdmflamfalkmflsdkmfmglmglnlkmdlkmfklamlkmlksdmkle',
      note: 5,
      nom: 'client',
      date: 'il y a deux mois'
    },
    {
      commentaire: 'Yooooo la cité kdkamdklmfalskmlksdmflamfalkmflsdkmfmglmglnlkmdlkmfklamlkmlksdmkle',
      note: 2,
      nom: 'client',
      date: 'il y a deux mois'
    } ,   {
      commentaire: 'Yooooo la cité kdkamdklmfalskmlksdmflamfalkmflsdkmfmglmglnlkmdlkmfklamlkmlksdmkle',
      note: 3,
      nom: 'client',
      date: 'il y a deux mois'
    },
    {
      commentaire: 'Yooooo la cité kdkamdklmfalskmlksdmflamfalkmflsdkmfmglmglnlkmdlkmfklamlkmlksdmkle',
      note: 1,
      nom: 'client',
      date: 'il y a deux mois'
    },
    {
      commentaire: 'Yooooo la cité kdkamdklmfalskmlksdmflamfalkmflsdkmfmglmglnlkmdlkmfklamlkmlksdmkle',
      note: 4,
      nom: 'client',
      date: 'il y a deux mois'
    }
  ];
  columns = [];

  ColumnMode = ColumnMode;

  constructor(
    public activeModal: NgbActiveModal,
    config: NgbRatingConfig

  ) { 
    config.max = 5;
		config.readonly = true;
  }

  ngOnInit(): void {
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
  

}

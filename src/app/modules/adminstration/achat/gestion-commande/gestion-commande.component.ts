import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestion-commande',
  templateUrl: './gestion-commande.component.html',
  styleUrls: ['./gestion-commande.component.scss']
})
export class GestionCommandeComponent implements OnInit {

  public currentRoute: string;

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.currentRoute  =this.route.snapshot.url.join('/administration/')
    console.log('url', this.currentRoute)
  }

}

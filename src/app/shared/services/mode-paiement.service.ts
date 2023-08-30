import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configurable } from 'src/app/core/config';
@Injectable({
  providedIn: 'root'
})
export class ModePaiementService {

  constructor(private http: HttpClient, private configService: Configurable) { }
      // GET ALL PRODUIT
      public gettAllModePaiement() {
        return this.http.get(this.configService.getApi1("PAIEMENT_GETALL_GET"), {
          observe: "response",
        });
      }
}

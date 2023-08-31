import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configurable } from 'src/app/core/config';

@Injectable({
  providedIn: 'root'
})
export class PrixLivraisonService {

  constructor(private http: HttpClient, private configService: Configurable) { }

  // UPDATE PRIX LIVFRAISON
  public updatePrixLivraison(id: number, obj: any) {
   return this.http.put(
     this.configService.getApi("PRIXLIV_UPD_PUT") + "/" + id,
     obj,
     {
       observe: "response",
     }
   );
 }


 // ADD PRIX LIVRAISON
 public addPrixLivraison(obj: any) {
   return this.http.post(
     this.configService.getApi("PRIXLIV_ADD_POST"),
     obj,
     {
       observe: "response",
       // params: form,
     }
   );
 }

  // ASSIGN PRIX LIVRAISON
  public assignPrixLivraison(obj: any) {
    return this.http.get(
      this.configService.getApi("PRIXLIV_ASSIGN_GET"),
      {
        observe: "response",
        params: obj
      }
    );
  }


 // GET ALL PRIX LIVRAISON
 public gettAllPrixLivraison(obj: any) {
   return this.http.get(this.configService.getApi("PRIXLIV_GETALL_GET"), {
     observe: "response",
     params: obj,
   });
 }


 // DELETE PRIX LIVRAISON
 public deletePrixLivraison(id: number) {
   return this.http.delete(
     this.configService.getApi("PRIXLIV_DEL_DEL") + "/" + id,
     {
       observe: "response",
     }
   );
 }
}

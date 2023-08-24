import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Configurable } from "src/app/core/config";

@Injectable({
  providedIn: "root",
})
export class ProduitService {
  constructor(private http: HttpClient, private configService: Configurable) {}

  // UPDATE PRODUIT
  public updateProduit(id: number, produitDto: any, files?: any[]) {
    let form = new FormData();
    if (files) {
      files.map((el) => {
        form.append("files", el);
      });
    }
    form.append("produitDto", JSON.stringify(produitDto));
    return this.http.put(
      this.configService.getApi("PRODUIT_UPD_PUT") + "/" + id,
      {
        observe: "response",
        params: form,
      }
    );
  }

  // ADD PRODUIT
  public addProduit(produitDto: any, files?: any[]) {
    let form = new FormData();
    if (files) {
      files.map((el) => {
        form.append("files", el);
      });
    }
    form.append("produitDto", JSON.stringify(produitDto));
    return this.http.post(this.configService.getApi("PRODUIT_ADD_POST"), {
      observe: "response",
      params: form,
    });
  }

  // GET ALL PRODUIT
  public gettAllProduit(
    pagination: boolean,
    page?: number,
    size?: number,
    boutiqueid?: number,
    categorieid?: number,
    nom?: string
  ) {
    return this.http.get(this.configService.getApi("PRODUIT_GETALL_GET"), {
      observe: "response",
    });
  }

  // GET ALL PRODUIT
  public getAvisProduit(produitid: number) {
    return this.http.get(
      this.configService.getApi("PRODUIT_GETAVIS_GET") + "/" + produitid,
      {
        observe: "response",
      }
    );
  }

   // DELETE PRODUIT
   public deleteProduit(id: number) {
    return this.http.delete(
      this.configService.getApi("PRODUIT_DEL_DEL") + "/" + id,
      {
        observe: "response",
      }
    );
  }
}

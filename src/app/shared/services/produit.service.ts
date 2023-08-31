import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Configurable } from "src/app/core/config";

@Injectable({
  providedIn: "root",
})
export class ProduitService {
  constructor(private http: HttpClient, private configService: Configurable) {}

  // UPDATE PRODUIT
  public updateProduit(id: number, produitDto: any) {
    // let form = new FormData();
    // if (files) {
    //   files.map((el) => {
    //     form.append("files", el);
    //   });
    // }
    // form.append("produitDto", JSON.stringify(produitDto));
    return this.http.put(
      this.configService.getApi1("PRODUIT_UPD_PUT") + "/" + id,
      produitDto,
      {
        observe: "response",
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
    return this.http.post(
      this.configService.getApi1("PRODUIT_ADD_POST"),
      form,
      {
        observe: "response",
        // params: form,
      }
    );
  }

  // GET ALL PRODUIT
  public gettAllProduit(obj: any) {
    return this.http.get(this.configService.getApi1("PRODUIT_GETALL_GET"), {
      observe: "response",
      params: obj,
    });
  }

  // GET  PRODUIT UPDATE POSITION
  public updatePositionProduit(produitid: any, position: any) {
    return this.http.get(
      this.configService.getApi1("PRODUIT_UPDATEPOSITION_GET") +
        "/" +
        produitid +
        "/" +
        position,
      {
        observe: "response",
      }
    );
  }

  // GET ALL PRODUIT
  public getAvisProduit(produitid: number) {
    return this.http.get(
      this.configService.getApi1("PRODUIT_GETAVIS_GET") + "/" + produitid,
      {
        observe: "response",
      }
    );
  }

  // DELETE PRODUIT
  public deleteProduit(id: number) {
    return this.http.delete(
      this.configService.getApi1("PRODUIT_DEL_DEL") + "/" + id,
      {
        observe: "response",
      }
    );
  }
}

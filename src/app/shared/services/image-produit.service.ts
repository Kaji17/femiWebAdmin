import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Configurable } from "src/app/core/config";

@Injectable({
  providedIn: "root",
})
export class ImageProduitService {
  constructor(private http: HttpClient, private configService: Configurable) {}

  // UPDATE PRODUIT
  public updateImgProduit(id: number, file: any) {
    return this.http.put(
      this.configService.getApi1("IMGPRODUIT_UPD_PUT") + "/" + id,
      file,
      {
        observe: "response",
      }
    );
  }

  // ADD PRODUIT
  public addImgProduit(produitid: number, files?: any[]) {
    let form = new FormData();
    if (files) {
      files.map((el) => {
        form.append("files", el);
      });
    }
    form.append("produitid", JSON.stringify(produitid));
    return this.http.post(
      this.configService.getApi1("IMGPRODUIT_ADD_POST"),
      form,
      {
        observe: "response",
      }
    );
  }

  // GET ALL PRODUIT
  public gettAllImgProduit(produitid?: any) {
    return this.http.get(this.configService.getApi1("PRODUIT_GETALL_GET"), {
      observe: "response",
      params: produitid,
    });
  }

  // DELETE PRODUIT
  public deleteImgProduit(id: number) {
    return this.http.delete(
      this.configService.getApi1("IMGPRODUIT_DEL_DEL") + "/" + id,
      {
        observe: "response",
      }
    );
  }
}

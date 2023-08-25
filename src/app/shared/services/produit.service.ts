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
      this.configService.getApi1("PRODUIT_UPD_PUT") + "/" + id,
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
    return this.http.post(this.configService.getApi1("PRODUIT_ADD_POST"),form, {
      observe: "response",
      // params: form,
    });
  }

  // GET ALL PRODUIT
  public gettAllProduit(
    pagination: boolean,
    boutiqueid?: number,
    page?: number,
    size?: number,
    categorieid?: number,
    nom?: string
  ) {
    let data: any = {
      pagination: pagination,
    };
    if (boutiqueid) {
      data.boutiqueid = boutiqueid;
    }
    if (page) {
      data.page = page;
    }
    if (size) {
      data.size = boutiqueid;
    }
    if (categorieid) {
      data.categorieid = categorieid;
    }
    if (nom) {
      data.nom = nom;
    }
    return this.http.get(this.configService.getApi1("PRODUIT_GETALL_GET"), {
      observe: "response",
      params: data,
    });
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

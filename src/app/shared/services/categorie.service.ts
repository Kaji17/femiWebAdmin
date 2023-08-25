import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Configurable } from "src/app/core/config";

@Injectable({
  providedIn: "root",
})
export class CategorieService {
  constructor(private http: HttpClient, private configService: Configurable) {}


  // UPDATE CATEGORIE
  public updateCategorie(id: any, obj: any) {
    return this.http.put(
      this.configService.getApi1("CATEGORIE_UPD_PUT") + "/" + id,
      obj,
      {
        observe: "response",
      }
    );
  }

  // ADD CATEGORIE
  public addCategorie(obj: any) {
    return this.http.post(
      this.configService.getApi1("CATEGORIE_ADD_POST"),
      obj,
      {
        observe: "response",
      }
    );
  }

  // GET ALL CATEGORIE
  public getAllCategorie(pagination: boolean, page?: number, size?: number) {
    let data: any ={
      pagination: pagination
    }
    if (page) {
      data.page =page
    }
    if (size) {
      data.size =size
    }

    return this.http.get(this.configService.getApi1("CATEGORIE_GETALL_GET"), {
      observe: "response",
      params: data
    });
  }

  // DELETE CATEGORIE
  public deleteCategorie(id: any) {
    return this.http.delete(
      this.configService.getApi1("CATEGORIE_DEL_DEL") + "/" + id,
      {
        observe: "response",
      }
    );
  }
}

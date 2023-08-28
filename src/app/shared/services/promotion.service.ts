import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configurable } from 'src/app/core/config';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient, private configService: Configurable) { }

   // UPDATE PROMOTION
   public updatePromotion(id: number, promotionDto: any, file: any) {
    let form = new FormData();

    const queryParams = new HttpParams({ fromObject: promotionDto });
    form.append("promotionDto", JSON.stringify(promotionDto));
    form.append("file", JSON.stringify(file));
    return this.http.put(
      this.configService.getApi1("PROMOTION_UPD_PUT") + "/" + id,
      form,
      {
        observe: "response",
      }
    );
  }

  // REMOVE PROMOTION
  public removePromotion(promotionid: number, produitid: any) {
    return this.http.put(
      this.configService.getApi1("PROMOTION_REMOVE_PUT") + "/" + promotionid+'/'+produitid,
      {
        observe: "response",
      }
    );
  }

    // UPDATE PRODUIT
    public assignPromotion(promotionid: number, produitid: any) {
      return this.http.put(
        this.configService.getApi1("PROMOTION_ASSIGN_PUT") + "/" + promotionid+'/'+produitid,
        {
          observe: "response",
        }
      );
    }

  // ADD PROMOTION
  public addPromotion(promotionDto: any, file?:any) {
    let form = new FormData();

    form.append("promotionDto", JSON.stringify(promotionDto));
    form.append("file", file);
    return this.http.post(
      this.configService.getApi1("PROMOTION_ADD_POST"),
      form,
      {
        observe: "response",
        // params: form,
      }
    );
  }

  // GET ALL PRODUIT
  public gettAllPromotion(obj: any) {
    return this.http.get(this.configService.getApi1("PROMOTION_GETALL_GET"), {
      observe: "response",
      params: obj,
    });
  }


  // GET ALL PRODUIT
  public gettAllTypePromotion() {
    return this.http.get(this.configService.getApi1("PROMOTION_GETALLTYPE_GET"), {
      observe: "response",
    });
  }

  // GET ALL PRODUIT
  public getAvisPromotion(produitid: number) {
    return this.http.get(
      this.configService.getApi1("PRODUIT_GETAVIS_GET") + "/" + produitid,
      {
        observe: "response",
      }
    );
  }

  // DELETE PRODUIT
  public deletePromotion(id: number) {
    return this.http.delete(
      this.configService.getApi1("PROMOTION_DEL_DEL") + "/" + id,
      {
        observe: "response",
      }
    );
  }
}

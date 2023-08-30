import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configurable } from 'src/app/core/config';

@Injectable({
  providedIn: 'root'
})
export class MiniBanniereService {

  constructor(
    private http: HttpClient, private configService: Configurable) { }

     // UPDATE PROMOTION
     public updateMiniBaniere(id: number, file: any) {
      let form = new FormData();
      form.append("file", JSON.stringify(file));
      
      return this.http.put(
        this.configService.getApi("MINIBANNIERE_UPD_PUT") + "/" + id,
        form,
        {
          observe: "response",
        }
      );
    }
  
    // ADD PROMOTION
    public addMiniBaniere(boutiqueid: any, file:any) {
      let form = new FormData();
      form.append("boutiqueid", boutiqueid);
      form.append("image", file);
      return this.http.post(
        this.configService.getApi("MINIBANNIERE_ADD_POST"),
        form,
        {
          observe: "response",
        }
      );
    }
  
    // GET ALL PRODUIT
    public gettAllMiniBaniere(obj: any) {
      return this.http.get(this.configService.getApi("MINIBANNIERE_GETALL_GET"), {
        observe: "response",
        params: obj,
      });
    }
  
  
    // GET ALL PRODUIT
    public getConfigMiniBaniere(obj:any) {

      return this.http.get(this.configService.getApi("MINIBANNIERE_GETCONFIG_GET"),{
        observe: "response",
        params: obj
      });
    }

    // DELETE PRODUIT
    public deleteMiniBaniere(id: number) {
      return this.http.delete(
        this.configService.getApi("MINIBANNIERE_DEL_DEL") + "/" + id,
        {
          observe: "response",
        }
      );
    }
}

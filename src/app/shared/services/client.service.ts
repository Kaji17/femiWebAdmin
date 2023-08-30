import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configurable } from 'src/app/core/config';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private configService: Configurable) { }

    // GET ALL PRODUIT
    public gettAllClient(obj: any) {
      return this.http.get(this.configService.getApi("CLIENT_GETALL_GET"), {
        observe: "response",
        params: obj,
      });
    }
}

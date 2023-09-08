import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configurable } from 'src/app/core/config';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient, private configService: Configurable) { }

    // GET ALL PRODUIT
    public gettAllTransaction(obj: any) {
      return this.http.get(this.configService.getApi1("ACHAT_GETALL_GET"), {
        observe: "response",
        params: obj,
      });
    }
}

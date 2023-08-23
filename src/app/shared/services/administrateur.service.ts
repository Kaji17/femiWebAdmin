import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Configurable } from "src/app/core/config";

@Injectable({
  providedIn: "root",
})
export class AdministrateurService {
  constructor(private http: HttpClient, private configService: Configurable) {}

  // Login
  public login(obj: any) {
    return this.http.post(this.configService.getApi("ADMIN_SIGNIN_POST"), obj, {
      observe: "response",
    });
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Configurable } from "src/app/core/config";

@Injectable({
  providedIn: "root",
})
export class CommandeService {
  constructor(private http: HttpClient, private configService: Configurable) {}

  // GET ALL COMMANDE
  public gettAllCommande(obj: any) {
    return this.http.get(this.configService.getApi1("COMMANDE_GETALL_GET"), {
      observe: "response",
      params: obj,
    });
  }

  // VALIDER COMMANDE
  public validerCommande(id: any) {
    return this.http.get(
      this.configService.getApi1("COMMANDE_VALIDER_GET") + "/" + id,
      {
        observe: "response",
      }
    );
  }

  // REGLER COMMANDE
  public reglerCommande(id: any) {
    return this.http.get(
      this.configService.getApi1("COMMANDE_REGLER_GET") + "/" + id,
      {
        observe: "response",
      }
    );
  }

  // REFUSER COMMANDE
  public refuserCommande(id: any) {
    return this.http.get(
      this.configService.getApi1("COMMANDE_REFUSER_GET") + "/" + id,
      {
        observe: "response",
      }
    );
  }

  // MODIFIER ETAPE COMMANDE
  public modifierEtapeCommande(commandeid: any, etapeid: any) {
    return this.http.get(
      this.configService.getApi1("COMMANDE_MODIFIERETAPE_GET") +
        "/" +
        commandeid +
        "/" +
        etapeid,
      {
        observe: "response",
      }
    );
  }

  // MODIFIER ETAPE COMMANDE
  public consulterEtapeCommande(commandeid: any) {
    return this.http.get(
      this.configService.getApi1("COMMANDE_GETETAPE_GET") + "/" + commandeid,
      {
        observe: "response",
      }
    );
  }

  // MODIFIER ETAPE COMMANDE
  public annulerCommande(id: any) {
    return this.http.get(
      this.configService.getApi1("COMMANDE_ANNULER_GET") + "/" + id,
      {
        observe: "response",
      }
    );
  }
}

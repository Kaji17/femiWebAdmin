import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Configurable } from "src/app/core/config";

@Injectable({
  providedIn: "root",
})
export class StatistiqueService {
  constructor(private http: HttpClient, private configService: Configurable) {}

  // STATISTIQUE PANIER MOYEN
  public panierMoyenStatistique(obj: any) {
    return this.http.get(
      this.configService.getApi2("STATISTIQUE_PANIERMOYEN_GET"),
      {
        observe: "response",
        params: obj,
      }
    );
  }

  // STATISTIQUE NOMBRE DE VENTES
  public nombreVentesStatistique(obj: any) {
    return this.http.get(
      this.configService.getApi2("STATISTIQUE_NOMBREVENTES_GET"),
      {
        observe: "response",
        params: obj,
      }
    );
  }

  // STATISTIQUE PRODUITS LES  PLUS VENDUS
  public produitPlusVendusStatistique(obj: any) {
    return this.http.get(
      this.configService.getApi2("STATISTIQUE_PRODUITPLUSVENDUS_GET"),
      {
        observe: "response",
        params: obj,
      }
    );
  }

  // STATISTIQUE MODE DE PAIEMENTS
  public modePaiementStatistique(obj: any) {
    return this.http.get(
      this.configService.getApi2("STATISTIQUE_MODEPAIEMENT_GET"),
      {
        observe: "response",
        params: obj,
      }
    );
  }

  // STATISTIQUE CHIFFRES D'AFFAIRES
  public chiffreAffaireStatistique(obj: any) {
    return this.http.get(
      this.configService.getApi2("STATISTIQUE_CHIFFREAFFAIRE_GET"),
      {
        observe: "response",
        params: obj,
      }
    );
  }
}

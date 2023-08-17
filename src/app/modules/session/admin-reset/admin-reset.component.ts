import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import SweetAlertType from "sweetalert2";
import SweetAlertOptions from "sweetalert2";

@Component({
  selector: "app-admin-reset",
  templateUrl: "./admin-reset.component.html",
  styleUrls: ["./admin-reset.component.scss"],
})
export class AdminResetComponent implements OnInit {
  constructor() {}

  public verify: boolean;
  ngOnInit(): void {
    this.verify = false;
  }

  infoSwal() {
    switch (this.verify) {
      case true:
        swal({
          title: "Success",
          text: "Votre mot de passe à été modifier avec succès",
          type: "success",
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success",
        });
        break;
      case false:
        swal({
          title: "Warning",
          text: "Erreur de modification de mot de passe",
          type: "warning",
          buttonsStyling: false,
          confirmButtonClass: "btn btn-warning",
        });
        break;

      default:
        break;
    }
    
  }
}

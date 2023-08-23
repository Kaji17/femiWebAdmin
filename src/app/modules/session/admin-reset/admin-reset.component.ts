import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AdministrateurService } from "src/app/shared/services/administrateur.service";
import { UtilisService } from "src/app/shared/services/utilis.service";
import swal from "sweetalert2";
import SweetAlertType from "sweetalert2";
import SweetAlertOptions from "sweetalert2";

@Component({
  selector: "app-admin-reset",
  templateUrl: "./admin-reset.component.html",
  styleUrls: ["./admin-reset.component.scss"],
})
export class AdminResetComponent implements OnInit, OnDestroy {
  public formResetPassword: FormGroup;
  public loading: boolean = false;
  public suscriptionResetPassword: Subscription;
  public verify: boolean;
  public password1: string;
  public password2: string;
  public responseReset: Boolean = true;

  constructor(
    private adminservice: AdministrateurService,
    private utilitisService: UtilisService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnDestroy(): void {
    this.loading ? this.suscriptionResetPassword.unsubscribe() : "";
  }

  ngOnInit(): void {
    this.builForm()
  }

  builForm() {
    this.formResetPassword = this.fb.group({
      otp: [
        "",
        [Validators.required,Validators.pattern(/^\w{4}$/)],
      ],
      newpassword: [
        "",
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        ],
      ],
      newpassword1: [
        "",
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        ],
      ],
    });
  }

  infoSwal(bool: boolean) {
    if(bool){
      swal({
        title: "Success",
        text: "Votre mot de passe à été modifier avec succès",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        onClose : ()=>{
          this.router.navigate([""]);
        }
      });
    }else{
      swal({
        title: 'Attention',
        text: "OTP saisie incorrecte",
        type: 'warning',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-warning',
        onClose : ()=>{
          this.builForm()
        }
      });
    }
  }

  // Validation du formulaire
  handleOk() {
    let res :any={};
    let o = JSON.parse(localStorage.getItem("user_email"))
    res.username = o.email
    res.otp = this.formResetPassword.value.otp
    res.newpasswd = this.formResetPassword.value.newpassword;
    console.log("+++++=+++++=Res+++++=++++++", this.formResetPassword)
    this.resetPassword(res);
  }

  resetPassword(obj) {
    this.loading = true;
    this.suscriptionResetPassword = this.adminservice
      .resetPassword(obj)
      .subscribe({
        next: (data) => {
          this.utilitisService.response(data, (d: any) => {
            this.loading = false;
            console.log(d);
            if (data.status == 204) {
              this.responseReset = false
              this.infoSwal(false)
            } else {
              this.infoSwal(true)
            }
          });
        },
        error: (error) => {
          this.utilitisService.response(error, (d: any) => {
            this.loading = false;
          });
        },
      });
  }
}

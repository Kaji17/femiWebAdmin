import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AdministrateurService } from "src/app/shared/services/administrateur.service";
import { UtilisService } from "src/app/shared/services/utilis.service";

@Component({
  selector: "app-admin-forgot",
  templateUrl: "./admin-forgot.component.html",
  styleUrls: ["./admin-forgot.component.scss"],
})
export class AdminForgotComponent implements OnInit, OnDestroy {

  public formForgotPassword: FormGroup;
  public loading: boolean = false;
  public suscriptionForgotPassword: Subscription;

  constructor(
    private fb: FormBuilder,
    private adminservice: AdministrateurService,
    private utilitisService: UtilisService,
    private router: Router

  ) {}
  ngOnDestroy(): void {
    this.loading?this.suscriptionForgotPassword.unsubscribe():''
  }

  ngOnInit(): void {
    this.builForm();
  }

  builForm() {
    this.formForgotPassword = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,100}$"),
        ],
      ],
    });
  }

  // Validation du formulaire
  handleOk() {
    let res = this.formForgotPassword.value;
    this.getOtp(res);
  }

  getOtp(obj:any){
    this.loading = true
    this.suscriptionForgotPassword = this.adminservice.forgotPassword(obj).subscribe({
      next: data=>{
        this.utilitisService.response(data, (d:any) => {
          this.loading=false
          console.log(d)
          localStorage.setItem('user_email',JSON.stringify(obj))
          this.router.navigate(['session/reset-password'])
        });
      },
      error: (error) => {
        this.utilitisService.response(error,(d:any)=>{
          this.loading=false
        })
      }
    });
  }
}

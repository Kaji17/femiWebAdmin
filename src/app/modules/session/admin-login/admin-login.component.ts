import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { AdministrateurService } from "src/app/shared/services/administrateur.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { UtilisService } from "src/app/shared/services/utilis.service";

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.scss"],
})
export class AdminLoginComponent implements OnInit, OnDestroy {
  // VARIABLES
  public loginForm: FormGroup;
  public loading: boolean = false;
  public tokenFirebase: any;
  public suscriptionLogin: Subscription;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private adminService: AdministrateurService,
    private utilitisService: UtilisService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.loading?this.suscriptionLogin.unsubscribe():''
  }

  ngOnInit(): void {
    this.buildForm();
  }

  // Construction du formulaire
  buildForm() {
    this.loginForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,100}$"),
        ],
      ],
      password: ["", [Validators.required]],
    });
  }

  // Validation du formulaire
  handleOk() {
    let res = this.loginForm.value;
    res.resgistrationtoken = this.tokenFirebase;
    this.login(res);
  }

  // Notification alerte
  showNotification(type) {
    if (type === "default") {
      this.toastr.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Error server 505</span> <span data-notify="message">Désolé le serveur est innacsseible pour l\'instant réesayer plus tard</span></div>',
        "",
        {
          timeOut: 3000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: "alert-title",
          positionClass: "toast-top-center",
          toastClass:
            "ngx-toastr alert alert-dismissible alert-default alert-notify",
        }
      );
    }
    if (type === "danger") {
      this.toastr.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Mettez les bons identifiants</span></div>',
        "",
        {
          timeOut: 3000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: "alert-title",
          positionClass: "toast-top-center",
          toastClass:
            "ngx-toastr alert alert-dismissible alert-danger alert-notify",
        }
      );
    }
    if (type === "success") {
      this.toastr.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Ngx Toastr</span> <span data-notify="message">Turning standard Bootstrap alerts into awesome notifications</span></div>',
        "",
        {
          timeOut: 3000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: "alert-title",
          positionClass: "toast-top-center",
          toastClass:
            "ngx-toastr alert alert-dismissible alert-success alert-notify",
        }
      );
    }
  }

  // Se connecter
  login(obj: any) {
    this.loading = true;
    this.suscriptionLogin = this.adminService.login(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          this.loading = false;
          console.log(d);
          if (data.status == 204) {
            this.loading = false;
            this.authService.setLogged(false)
            this.showNotification("danger");
          } else if (data.status == 200) {
            localStorage.setItem("user_info", JSON.stringify(d));
            this.authService.setLogged(true)
            this.router.navigate(["administration"]);
          } else {
            this.loading = false;
            this.authService.setLogged(false)
            this.showNotification("default");
          }
        });
      },
      error: (error) => {
        this.loading = false;
        this.authService.setLogged(false)
        this.showNotification("danger");
      },
    });
  }
}

import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AdministrateurService } from "src/app/shared/services/administrateur.service";
import { UtilisService } from "src/app/shared/services/utilis.service";
import swal from "sweetalert2";

@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.scss"],
})
export class ProfilComponent implements OnInit, OnDestroy {
  public emailHide: string;
  public role: string;
  public nomboutique: string;
  public loading: boolean = false;
  public loading1: boolean = false;
  public suscriptionUpdatePassword: Subscription;
  public suscriptionUpdateAdminInfo: Subscription;

  formEditProfile!: FormGroup;
  formEditPassword!: FormGroup;
  public password1: string;
  public password2: string;
  public lastmotdepasse: string;
  public profil: any;

  constructor(
    private formBuilder: FormBuilder,
    private adminservice: AdministrateurService,
    private utilitisService: UtilisService
  ) {}
  ngOnDestroy(): void {
    this.loading1 ? this.suscriptionUpdatePassword.unsubscribe() : "";
    this.loading ? this.suscriptionUpdateAdminInfo.unsubscribe() : "";
  }

  ngOnInit(): void {
    this.profil = JSON.parse(localStorage.getItem("user_info"));
    this.buildForm();
    this.role = this.profil.body.role.nom;
    this.nomboutique = this.profil.body.boutique.nom;
    this.lastmotdepasse = "123";
    this.emailHide = this.hideEmail(this.profil.body.email);
    console.log("Hide", this.emailHide);
  }


  // Construction du formulaire
  buildForm() {
    let fv: any = this.profil;

    this.formEditProfile = this.formBuilder.group({
      nom:[
        fv && fv.body.nom ?  fv.body.nom : null,[Validators.required]
      ],
      contact: [
        fv && fv.body.contact ?  fv.body.contact: null,
        [Validators.required, Validators.pattern(/^\w{10}$/)],
      ],
      email: [
        fv && fv.body.email ?  fv.body.email : null,[Validators.required]
      ],
      role: [
        fv && fv.body.role ?  fv.body.role : null,[Validators.required]
      ],
      motdepasse: [
        fv && fv.body.motdepasse ?  fv.body.motdepasse : null,[]
      ],
      boutique: [
        fv && fv.body.boutique ?  fv.body.boutique : null,[Validators.required]
      ]
    });

    this.formEditPassword = this.formBuilder.group({
      currentpassword: ["", [Validators.required]],
      newpassord: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          ),
        ],
      ],
      confirmpassword: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          ),
        ],
      ],
    });
  }


  handleOk1() {
    console.log(this.formEditProfile);   
    console.log("+++++=+++++=Res+++++=++++++", this.formEditProfile.value);
    let res: any = {};
    res = this.formEditProfile.value
    this.updateAdminInfo(res, this.profil.body.id);
  }

  handleOk2() {
    let res: any = {};
    let o = JSON.parse(localStorage.getItem("user_info"));
    res.id = o.body.id;
    res.lastpasswd = this.formEditPassword.value.currentpassword;
    res.newpasswd = this.formEditPassword.value.newpassord;
    console.log("+++++=+++++=Res+++++=++++++", this.formEditPassword);
    this.updatePassword(res);
  }
  hideEmail(email: string): string {
    return email.replace(/^(.{2}).+(.{2}@)/, "$1xxxxxxxx$2");
  }

  infoSwal(bool: boolean) {
    if (bool) {
      swal({
        title: "Success",
        text: "Votre mot de passe à été modifier avec succès",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        onClose: () => {
          this.buildForm();
          location.reload()
        },
      });
    } else {
      swal({
        title: "Attention",
        text: "Erreur de modification du mot de passe, mot de passe actuel incorrect",
        type: "warning",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-warning",
      });
    }
  }

  // Modification du mot de passe
  updatePassword(obj) {
    this.loading1 = true;
    this.suscriptionUpdatePassword = this.adminservice
      .updatePassword(obj)
      .subscribe({
        next: (data) => {
          this.utilitisService.response(data, (d: any) => {
            this.loading1 = false;
            console.log(d);
            if (data.status == 401) {
              this.infoSwal(false);
            } else {
              this.infoSwal(true);
              this.loading1 = false;
            }
          });
        },
        error: (error) => {
          this.utilitisService.response(error, (d: any) => {
            this.loading1 = false;
            console.log(d);
            if (d.status == 401) {
              this.infoSwal(false);
            }
          });
        },
      });
  }

  // Modification des infos de l'admin
  updateAdminInfo(obj, id) {
    this.loading = true;
    this.suscriptionUpdateAdminInfo = this.adminservice
      .updateAdmin(obj, id)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.utilitisService.response(data, (d: any) => {
            this.loading = false;
            console.log(d);
            if (data.status==204) {
              this.infoSwal(false);
            } else {
              this.infoSwal(true);
              localStorage.setItem("user_info", JSON.stringify(d));
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

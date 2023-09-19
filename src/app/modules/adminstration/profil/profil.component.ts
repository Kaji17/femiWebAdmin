import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { Configurable } from "src/app/core/config";
import { AdministrateurService } from "src/app/shared/services/administrateur.service";
import { UtilisService } from "src/app/shared/services/utilis.service";
import swal from "sweetalert2";
import { ModalPhotoProfilComponent } from "./modal-photo-profil/modal-photo-profil.component";

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
  closeResult: string;

  formEditProfile!: FormGroup;
  formEditPassword!: FormGroup;
  public password1: string;
  public password2: string;
  public lastmotdepasse: string;
  public profil: any;

  file: any;
  fileSrc: any = "";
  background: boolean;
  fileTab: any[] = [];
  fileTabSrc: any[] = [];
  passVar:boolean=false
  passVar1:boolean=false


  constructor(
    private formBuilder: FormBuilder,
    private adminservice: AdministrateurService,
    private utilitisService: UtilisService,
    private modalService: NgbModal,
    private configService: Configurable,
    private router: Router,
    // private location: Location
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
      nom: [fv && fv.body.nom ? fv.body.nom : null, [Validators.required]],
      contact: [
        fv && fv.body.contact ? fv.body.contact : null,
        [Validators.required, Validators.pattern(/^\w{10}$/)],
      ],
      email: [
        fv && fv.body.email ? fv.body.email : null,
        [Validators.required],
      ],
      role: [fv && fv.body.role ? fv.body.role : null, [Validators.required]],
      motdepasse: [fv && fv.body.motdepasse ? fv.body.motdepasse : null, []],
      boutique: [
        fv && fv.body.boutique ? fv.body.boutique : null,
        [Validators.required],
      ],
    });

    this.formEditPassword = this.formBuilder.group({
      currentpassword: ["", [Validators.required]],
      newpassord: [
        "",
        [
          Validators.required
        ],
      ],
      confirmpassword: [
        null,
        [
          Validators.required
        ],
      ],
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newpassord').value;
    const confirmPassword = form.get('confirmpassword').value;

    if (password === confirmPassword) {
      return null; // Les mots de passe correspondent, la validation réussit.
    } else {
      return { passwordMismatch: true }; // Les mots de passe ne correspondent pas, la validation échoue.
    }
  }

  handleOk1() {
    console.log(this.formEditProfile);
    console.log("+++++=+++++=Res+++++=++++++", this.formEditProfile.value);
    let res: any = {};
    res = this.formEditProfile.value;
    console.log('fgfgf', this.profil.body.id)
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
        text: "Vos informations ont été modifier avec succès",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        onClose: () => {
          this.buildForm();
          location.reload();
        },
      });
    } else {
      swal({
        title: "Attention",
        text: "Erreur de modification de vos informations de profil",
        type: "warning",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-warning",
      });
    }
  }
  infoSwal1(bool: boolean) {
    if (bool) {
      swal({
        title: "Success",
        text: "Votre mot de passe été modifier avec succès",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        onClose: () => {
          this.buildForm();
          location.reload();
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
              this.infoSwal1(true);
              this.loading1 = false;
            }
          });
        },
        error: (error) => {
          this.utilitisService.response(error, (d: any) => {
            this.loading1 = false;
            console.log(d);
            if (d.status == 401) {
              this.infoSwal1(false);
            }
          });
        },
      });
  }

  // Modification des infos de l'admin
  updateAdminInfo(obj, id) {
    this.loading = true;
    this.suscriptionUpdateAdminInfo = this.adminservice
      .updateAdmin(id,obj)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.utilitisService.response(data, (d: any) => {
            
            console.log(d);
            if (data.status == 204) {
              this.infoSwal1(false);
            } else {
              this.loading=false
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

  openPhoto() {
    const modalRef = this.modalService.open(ModalPhotoProfilComponent, {
      windowClass: "modal-mini",
      size: "sm",
      centered: true,
    });
    modalRef.result.then(
      (result) => {
        this.closeResult = "Closed with: " + result;
        console.log("yaaaa", this.closeResult);
      },
      (reason) => {
        this.closeResult = "Dismissed " + this.getDismissReason(reason);
      }
    );
    modalRef.componentInstance.infoDaTa = this.profil.body.photo;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return "with: $reason";
    }
  }

  getImg(src: string) {
    if (src) {
      return src.replace(
        this.configService.get("imgVar"),
        this.configService.get("imgHttp")
      ) as any;
    }
  }

  getFisrtLetter(src: string) {
    if (src) {
      return src.substring(0, 1);
    }
  }

  // Charger les images
  loadFile(event: any, e?: any) {
    // let id = this.rowSelected.id;
    let reader = new FileReader();
    console.log("KK", reader);
    this.file = event.target.files[0];

    this.fileTab.push(this.file);
    reader.readAsDataURL(this.file);
    reader.onload = (e) => {
      this.fileSrc = reader.result as string;
      this.background = true;
      this.fileTabSrc.push(this.fileSrc);
      console.log("e", e);
    };
    // if (e == "u") {
    //   console.log("Modification", this.file);
    //   this.UpdateMiniBanniere(this.idMiniBannSelect.id, this.file);
    // } else {
    //   console.log("Ajout", this.file);

    // }
    this.updatePhotoAdmin(this.profil.body.id, this.file);
    console.log("La table src", this.fileTab);
    console.log("La table", this.fileSrc);
  }

  updatePhotoAdmin(id, file) {
    this.adminservice.updatePhoto(id, file).subscribe({
      next: (data) => {
        console.log("response==", data);
        this.utilitisService.response(data, (d: any) => {
          console.log("======response", d);
          if (d.status == 200) {
            console.log("======response", d);
            localStorage.setItem("user_info", JSON.stringify(d));
            this.profil = JSON.parse(localStorage.getItem("user_info"));
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(["administration/profil"]);
            });
          } else {
            // this.infoSwal(false);
          }
        });
      },
    });
  }

  getAllAdmin(obj) {
    this.adminservice.getAllAdmin(obj).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log("======response", d);
          if (d.status == 200) {
            console.log("======response", d);
            localStorage.setItem("user_info", JSON.stringify(d));
            // this.ngOnInit()
            // this.infoSwal(true);
          } else {
            // this.infoSwal(false);
          }
        });
      },
    });
  }

  submitForm(){
    if(this.formEditPassword.valid&&(this.password1=this.password2)){
      this.handleOk2()
    }
  }

  clicPass(){
    this.passVar=!this.passVar
  }
  clicPass1(){
    this.passVar1=!this.passVar1
  }
}

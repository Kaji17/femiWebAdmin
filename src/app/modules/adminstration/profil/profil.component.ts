import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.scss"],
})
export class ProfilComponent implements OnInit {
  public nameAdmin: string;
  formEditProfile!: FormGroup;
  formEditPassword!: FormGroup;
  public lastmotdepasse:string

  constructor(private formBuilder: FormBuilder) {}

  // Construction du formulaire
  buildForm() {
    this.formEditProfile = this.formBuilder.group({
      username: ["", [Validators.required]],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,100}$"),
        ],
      ],
      contact: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });

    this.formEditPassword = this.formBuilder.group({
      currentpassword: ["", [Validators.required]],
      newpassord: ["", [Validators.required]],
      confirmpassword: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.nameAdmin = "Gozou";
    this.buildForm();
    this.lastmotdepasse = "123"
  }

  handleOk1() {
    console.log(this.formEditProfile);
  }

  handleOk2() {
    console.log(this.formEditPassword);
  }
}

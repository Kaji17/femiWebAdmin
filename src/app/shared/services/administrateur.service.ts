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

  // Forgot password
  public forgotPassword(email: any) {
    return this.http.get(this.configService.getApi("ADMIN_OTP_GET"), {
      observe: "response",
      params: email,
    });
  }

  // Reset password
  public resetPassword(obj: any) {
    return this.http.post(
      this.configService.getApi("ADMIN_RESETPASSWORD_POST"),
      obj,
      {
        observe: "response",
      }
    );
  }

  // Update password
  public updatePassword(obj: any) {
    return this.http.put(
      this.configService.getApi("ADMIN_UPDPASSWORD_PUT"),
      obj,
      {
        observe: "response",
      }
    );
  }



  // Update profil admin
  public updateAdmin(adminId,obj ) {
    return this.http.put(
      this.configService.getApi("ADMIN_UPD_PUT") + `/` + adminId,
      obj,
      {
        observe: "response",
      }
    );
  }

    // UPDATE PHOTO PROFIL
    public updatePhoto(id: any, file: any) {
      let form = new FormData();
      form.append("id", id);
      form.append("image", file);
      return this.http.put(
        this.configService.getApi("ADMIN_UPDPHOTO_PUT"),
        form,
        {
          observe: "response",
          // params: form,
        }
      );
    }

  // Add admin
  public addAdmin(obj: any) {
    return this.http.post(this.configService.getApi("ADMIN_ADD_POST"), obj, {
      observe: "response",
    });
  }

  // Get All admin
  public getAllAdmin(obj: any) {
    return this.http.get(this.configService.getApi("ADMIN_GETALL_GET"), {
      observe: "response",
      params: obj,
    });
  }

    // Get All admin
    public deleteAdmin(id: any) {
      return this.http.delete(this.configService.getApi("ADMIN_DEL_DEL")+'/'+id, {
        observe: "response",
      });
    }
}

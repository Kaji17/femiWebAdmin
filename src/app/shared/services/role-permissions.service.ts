import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configurable } from 'src/app/core/config';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionsService {

  constructor(private http: HttpClient, private configService: Configurable) {}

  // ADD ROLE
  public updateRole(id:number,obj: any) {
    return this.http.put(this.configService.getApi("ROLE_UPD_PUT")+'/'+id, obj, {
      observe: "response",
    });
  }

  // Forgot password
  public addRole(obj: any) {
    return this.http.post(this.configService.getApi("ROLE_ADD_POST"),obj, {
      observe: "response",
    });
  }

  // Reset password
  public getAllRole(obj: any) {
    return this.http.get(
      this.configService.getApi("ROLE_GETALL_GET"),
      {
        observe: "response",
        params: obj
      }
    );
  }

  // Update password
  public deleteRole(id: number) {
    return this.http.delete(
      this.configService.getApi("ADMIN_UPDPASSWORD_PUT")+'/'+id,
      {
        observe: "response",
      }
    );
  }

}
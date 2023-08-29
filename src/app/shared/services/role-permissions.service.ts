import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavConstants } from 'src/app/constants/nav.const';
import { Configurable } from 'src/app/core/config';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionsService {

  constructor(private http: HttpClient, private configService: Configurable) {}

  public menuItems: any[];
  public menuItemsBoutique: any[];

  getMenuPermission(){
    return this.menuItems
  }


  getMenuPermissionBoutique(){
    return this.menuItemsBoutique
  }

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
      this.configService.getApi("ROLE_DEL_DEL")+'/'+id,
      {
        observe: "response",
      }
    );
  }

  // Attribuer les permissions 
  public setPermission(infoUser:any){
    if (infoUser.body.role.nom=="Administrateur") {
      let encodedValue = infoUser.body.boutique.description;

      // Décodez la valeur en base64
      let decodedValue = atob(encodedValue);

      // Parsez la valeur décodée pour obtenir un objet JSON
      let decodedObject = JSON.parse(decodedValue);
      this.menuItems = decodedObject;
      console.log('===description décodé de l\'administrateur P success',this.menuItems)
      
    }else  {
      let encodedValue = infoUser.body.role.description;

      // Décodez la valeur en base64
      let decodedValue = atob(encodedValue);

      // Parsez la valeur décodée pour obtenir un objet JSON
      let decodedObject = JSON.parse(decodedValue);
      this.menuItems = decodedObject;
      console.log('===description décodé de l\'utilisateur success',this.menuItems)
    }}


  // public setPermissionBoutique(infoUser:any){
  //   if (infoUser.body.role.description) {
  //      let encodedValue = infoUser.body.role.description;
 
  //      // Décodez la valeur en base64
  //      let decodedValue = atob(encodedValue);
 
  //      // Parsez la valeur décodée pour obtenir un objet JSON
  //      let decodedObject = JSON.parse(decodedValue);
  //      this.menuItems = decodedObject;
  //      console.log('===description décodé success',this.menuItems)
  //    }
  //    else{
  //      console.log('===description vide')
  //      this.menuItems = NavConstants;
  //    }
  //  }

}

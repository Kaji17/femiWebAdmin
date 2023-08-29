import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavConstants } from 'src/app/constants/nav.const';
import { navAdminItems } from 'src/app/constants/_nav';
import { RolePermissionsService } from 'src/app/shared/services/role-permissions.service';

export const NOTIF: any[] = [
  {  title: 'Dashboard', describe: 'describe',  icon: 'ni-tv-2 text-primary', date: '12/03/2003'},
  {  title: 'Notif1', describe: 'describe',  icon: 'ni-planet text-blue', date: '12/03/2003'},
  {  title: 'Notif2', describe: 'describe',  icon: 'ni-pin-3 text-orange', date: '12/03/2003'},
  {  title: 'Notif3', describe: 'describe',  icon: 'ni-single-02 text-yellow', date: '12/03/2003'},
  {  title: 'Notif14', describe: 'describe',  icon: 'ni-key-25 text-info', date: '12/03/2003'},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];

  public notifs: any[];

  public isCollapsed = true;

  public notifChecked =false;

  isExpanded: boolean = true;

  public infoUser:any

  constructor(private router: Router,
    private rolePermission: RolePermissionsService) {
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
    this.rolePermission.setPermission(this.infoUser)
   }

  ngOnInit() {
    // this.getPermission()
    this.menuItems=this.rolePermission.getMenuPermission()
    console.log("====Permission", this.menuItems)

  //  this.menuItems = NavConstants
   this.notifs=[
    {  title: 'Dashboard', describe: 'describe',  icon: 'ni-tv-2 text-primary', date: '12/03/2003'},
    {  title: 'Notif1', describe: 'describe',  icon: 'ni-planet text-blue', date: '12/03/2003'},
    {  title: 'Notif2', describe: 'describe',  icon: 'ni-pin-3 text-orange', date: '12/03/2003'},
    {  title: 'Notif3', describe: 'describe',  icon: 'ni-single-02 text-yellow', date: '12/03/2003'},
    {  title: 'Notif14', describe: 'describe',  icon: 'ni-key-25 text-info', date: '12/03/2003'},
   ]

  }

  toggleExpansion(index) {
    this.menuItems[index].isEpandedd = !this.menuItems[index].isEpandedd;
  }
  
  logOut(){
    localStorage.removeItem("user_info")
    localStorage.removeItem("user_email")
  }

  // getPermission(){
  //   if (this.infoUser.body.role.description) {
  //     let encodedValue = this.infoUser.body.role.description;

  //     // Décodez la valeur en base64
  //     let decodedValue = atob(encodedValue);

  //     // Parsez la valeur décodée pour obtenir un objet JSON
  //     let decodedObject = JSON.parse(decodedValue);
  //     this.menuItems = decodedObject;
  //     console.log('===description décodé success',this.menuItems)
  //   }
  //   else{
  //     console.log('===description vide')
  //     this.menuItems = NavConstants;
  //   }
  // }
}

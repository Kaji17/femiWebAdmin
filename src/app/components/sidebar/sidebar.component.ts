import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavConstants } from 'src/app/constants/nav.const';
import { navAdminItems } from 'src/app/constants/_nav';
import { RolePermissionsService } from 'src/app/shared/services/role-permissions.service';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Configurable } from 'src/app/core/config';

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

  public notifs: any[] = [];

  public isCollapsed = true;

  public notifChecked =false;

  isExpanded: boolean = true;

  public infoUser:any

  message_id: any =0

  constructor(
    private router: Router,
    private rolePermission: RolePermissionsService,
    public translate : TranslateService,
    private angularFireMessaging: AngularFireMessaging,
    private configService: Configurable


    ) {
    translate.addLangs(['en', 'fr']),
    translate.setDefaultLang('fr')
    this.infoUser = JSON.parse(localStorage.getItem("user_info"));
    this.rolePermission.setPermission(this.infoUser)
   }

  ngOnInit() {
    // this.getPermission()
    this.menuItems=this.rolePermission.getMenuPermission()
    console.log("====Permission", this.menuItems)

  //  this.menuItems = NavConstants
  //  this.notifs=[
  //   {  title: 'Dashboard', describe: 'describe',  icon: 'ni-tv-2 text-primary', date: '12/03/2003'},
  //   {  title: 'Notif1', describe: 'describe',  icon: 'ni-planet text-blue', date: '12/03/2003'},
  //   {  title: 'Notif2', describe: 'describe',  icon: 'ni-pin-3 text-orange', date: '12/03/2003'},
  //   {  title: 'Notif3', describe: 'describe',  icon: 'ni-single-02 text-yellow', date: '12/03/2003'},
  //   {  title: 'Notif14', describe: 'describe',  icon: 'ni-key-25 text-info', date: '12/03/2003'},
  //  ]
   this.angularFireMessaging.messages.subscribe((payload) => {
    console.log('nouveau message ', payload);
    this.notifs.push(payload.notification);
    this.playNotificationSound();
    let notifObj = {};
    if (localStorage.getItem('nouveauMessage')) {
      let a = JSON.parse(localStorage.getItem('nouveauMessage') as string);
      notifObj = {
        id: this.message_id,
        title: payload?.notification?.title,
        body: payload?.notification?.body,
        data: payload?.data,
        lue: false,
      };
      this.message_id = this.message_id+1
      localStorage.setItem('messageId', JSON.stringify(this.message_id))
      a.push(notifObj);
      this.notifs = a
      localStorage.setItem('nouveauMessage', JSON.stringify(a));
    }

    // this.messageService.add({
    //   key: 'livreur',
    //   sticky: false,
    //   severity: 'warn',
    //   summary: payload?.notification?.title,
    //   detail: payload?.notification?.body,
    // });
  });

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

  playNotificationSound() {
    console.log('==AUDIO==');
    const audio = new Audio();
    audio.src = 'assets/sons/notifson.mp3'; // Remplacez par le chemin relatif vers votre fichier sonore
    audio.load();
    audio.play();
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
}

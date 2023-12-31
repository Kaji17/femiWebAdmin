import { Component, OnInit, ElementRef, Input } from "@angular/core";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { NavConstants } from "src/app/constants/nav.const";
import { filter } from "rxjs/operators";
import { BreadcrumbService } from "src/app/shared/services/breadcrumb.service";
import { TranslateService } from "@ngx-translate/core";
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import { Configurable } from "src/app/core/config";
import { Store } from "@ngrx/store";
import { logoutAction } from "src/app/state/01-actions";
import { HttpClient } from "@angular/common/http";
import { NotificationService } from "src/app/shared/services/notification.service";
import { UtilisService } from "src/app/shared/services/utilis.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public menuItems: any[];
  public notifs: any[] = [];
  public name = "Get Current Url Route Demo";
  public currentRoute: string;
  titlebreadcrumb: string;
  itemsbreadcrumb: any[];
  public profil: any;
  public adminName: string
  public currentLang;
  message_id: any =0

  @Input() boutiqueName:string
  @Input() boutiqueLogo:string
  user: any;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    public translate : TranslateService,
    private angularFireMessaging: AngularFireMessaging,
    private configService: Configurable,
    private store: Store,
    public utilisService: UtilisService,
    private http: HttpClient,
    public notificationService: NotificationService,

  ) {
    translate.addLangs(['en', 'fr']),
    translate.setDefaultLang('fr')
    this.location = location;
    
  }

  switchLang(lang:string){
    this.translate.use(lang);
    this.currentLang= lang
  }
  ngOnInit() {
    this.user= JSON.parse(localStorage.getItem("user_info")).body
    console.log('LE USER',this.user)
    console.log('hjgjfkds', this.boutiqueLogo)
    this.currentLang='fr'
    this.profil = JSON.parse(localStorage.getItem("user_info"));
    this.menuItems = NavConstants;
    this.currentRoute = this.route.snapshot.url.join("/");
    console.log("url", this.currentRoute);
    this.getNotifications({page:0,size:10,administrateurid:this.user.id,isnotread:true,date:this.user.datederniereconnexion.split(' ')[0]})

    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log('nouveau message ', payload);
      this.notifs.push(payload.notification);
      this.playNotificationSound();
      let notifObj = {};
      if (localStorage.getItem('nouveauMessage')) {
        let a = JSON.parse(localStorage.getItem('nouveauMessage') as string);
        notifObj = {
          // id: this.message_id,
          titre: payload?.notification?.title,
          texte: payload?.notification?.body,
          // data: payload?.data,
          // lue: false,
        };
        // this.message_id = this.message_id+1
        // localStorage.setItem('messageId', JSON.stringify(this.message_id))
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

  seeNotif(){
    this.router.navigate(['administration/parametre/notifications'])
  }

  getNotifications(data?){
    // this.temp = [];
    console.log('==NOTIF==');
    data.pagination = true
    // data.rootid = this.user.id
    // if(this.etat!=null){
    //   data.isnotread=this.etat
    // }
    this.notificationService.getAll(data).subscribe({
      next: (data) => {
        this.utilisService.response(data, (d:any) => {
          console.log('notifications',d.body)
          // this.temp=d.content;
          localStorage.setItem('nouveauMessage', JSON.stringify(d.body.content))
          this.notifs = d.body.content;
          // this.page.pageNumber = d.number;
          // this.page.size = d.size;
          // this.page.totalElements = d.totalElements;
          // this.page.totalPages = d.totalPages;
        });
      },
      error: (error) => this.utilisService.response(error),
    });
  }


  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

  logOut() {
    this.store.dispatch(logoutAction())
    localStorage.removeItem("user_info");
    localStorage.removeItem("user_email");
  }

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

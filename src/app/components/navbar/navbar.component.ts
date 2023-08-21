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
  public notifs: any[];
  public name = "Get Current Url Route Demo";
  public currentRoute: string;
  titlebreadcrumb: string;
  itemsbreadcrumb: any[];

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.location = location;
  }

  ngOnInit() {
    // this.titlebreadcrumb = "Dasboard";
    // this.itemsbreadcrumb = [
    //   { name: "Accueil", path: "/administration/dasboard" },
    //   { name: "Dasboard", path: "/administration/dasboard" },
    // ];
    this.menuItems = NavConstants;
    this.notifs = [
      {
        title: "Dashboard",
        describe: "describe",
        icon: "ni-tv-2 text-primary",
        date: "12/03/2003",
      },
      {
        title: "Notif1",
        describe: "describe",
        icon: "ni-planet text-blue",
        date: "12/03/2003",
      },
      {
        title: "Notif2",
        describe: "describe",
        icon: "ni-pin-3 text-orange",
        date: "12/03/2003",
      },
      {
        title: "Notif3",
        describe: "describe",
        icon: "ni-single-02 text-yellow",
        date: "12/03/2003",
      },
      {
        title: "Notif14",
        describe: "describe",
        icon: "ni-key-25 text-info",
        date: "12/03/2003",
      },
    ];
    this.currentRoute = this.route.snapshot.url.join("/");
    console.log("url", this.currentRoute);
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
}

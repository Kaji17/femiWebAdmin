import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { initAction } from "./state/01-actions";
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store
  ) {}
  ngOnInit(): void {
  //  this.store.dispatch(initAction())
  }
  title = "argon-dashboard-angular";


}

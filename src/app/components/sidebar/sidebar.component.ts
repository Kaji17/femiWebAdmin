import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavConstants } from 'src/app/constants/nav.const';

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

  constructor(private router: Router) { }

  ngOnInit() {
   this.menuItems = NavConstants
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
}

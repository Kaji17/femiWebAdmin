import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/shared/model/page';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  page = new Page();
  user: any;
  temp: any[];
  lesLus:any=[];
  etat:any
  current:any
  constructor(
    public notificationService: NotificationService,
    public utilisService: UtilisService,
    private toastr: ToastrService,
  ) {
    this.page.page = 0;
    this.page.size = 10;
    // this.page.totalElements = 10;
    // this.page.totalPages = 10;
   }

  ngOnInit(): void {
    this.user= JSON.parse(localStorage.getItem("user_info")).body 
    this.getNotifications({page:this.page.page,size:this.page.size})
    this.current=0
  }

  change(etat,current){
    this.etat=etat
    this.current=current
    this.getNotifications({page:this.page.page,size:this.page.size})
  }

  handleMark(mode,notif?){
    this.lesLus=[]
    
    if(mode=='grand'){
      this.temp.map(el=>{
        this.lesLus.push(el.id)
      })
    }
    else{
      this.lesLus.push(notif.id)
    }
    console.log(this.lesLus)
    this.marquerLu(this.lesLus)
  }

  marquerLu(data){
    this.notificationService.read(data).subscribe({
      next: (data) => {
        this.utilisService.response(data, (d:any) => {
          this.toastr.success('Notification(s) marquées comme lue(s)!', 'Succès');
          this.getNotifications({page:this.page.page,size:this.page.size})
        });
      },
      error: (error) => this.utilisService.response(error),
    });
  }

  getNotifications(data?){
    this.temp = [];
    data.pagination = true
    data.administrateurid = this.user.id
    if(this.etat!=null){
      data.isnotread=this.etat
    }
    this.notificationService.getAll(data).subscribe({
      next: (data) => {
        this.utilisService.response(data, (d:any) => {
          console.log('notifications',d)
          this.temp=d.body.content;
          this.page.page = d.body.number;
          this.page.size = d.body.size;
          // this.page.totalElements = d.totalElements;
          // this.page.totalPages = d.totalPages;
        });
      },
      error: (error) => this.utilisService.response(error),
    });
  }

}

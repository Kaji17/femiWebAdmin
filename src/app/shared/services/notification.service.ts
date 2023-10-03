import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configurable } from 'src/app/core/config';




@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  url = '';

  constructor(private http: HttpClient, private configService: Configurable) {
    // this.url = this.configService.get('HOST_API-DEV3');
  }

  public getAll(obj?:any) {
    console.log("GET NOTIF")
    let data
    if(obj){data=obj}
    return this.http.get(this.configService.getApi3('NOTIFICATION_GET'), {
      observe: 'response',
      params:data
    });
  }

  public read(obj?:any) {
    let data = {"id":obj}
    // if(obj){data=obj}
    return this.http.put(this.configService.getApi3('NOTIFICATION_READ'),data, {
      observe: 'response',
      // params:data
      
    });
  }




}
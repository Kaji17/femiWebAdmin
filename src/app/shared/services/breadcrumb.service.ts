import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private  data :any[]
  private  datatitle :string

  constructor(private http: HttpClient) { }

  public setData(data: any[], title:string){
    this.data = data
    this.datatitle = title
  }

  public getData(){
    return this.data
  }
  public getDataTitle(){
    return this.datatitle
  }

  public getApi(obj: any){
    return this.http.get<any>("https://swapi.dev/api/people/",
      {
        params: obj,
      })
    ;
  }

}

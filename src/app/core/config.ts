import { Injectable } from '@angular/core';
import ApiUrls from '../../assets/config/developpement.json';
@Injectable({
  providedIn: 'root',
})
export class Configurable {
  private readonly API_ENDPOINT: any;

  constructor() {
    this.API_ENDPOINT = ApiUrls;
  }

  public get(key: string) {
    return this.API_ENDPOINT[key];
  }

  getApi(key: string): string {
    let a = ApiUrls['API_ENDPOINTS']
 
    // 
    
    // 
    // 

    // 
    return `${ApiUrls['HOST_API-DEV']}${a[key as keyof typeof a]}`;
  }
  getApi1(key: string): string {
    let a = ApiUrls['API_ENDPOINTS']
 
    // 
    
    // 
    // 

    // 
    return `${ApiUrls['HOST_API-DEV1']}${a[key as keyof typeof a]}`;
  }

  getApi2(key: string): string {
    let a = ApiUrls['API_ENDPOINTS']
 
    // 
    
    // 
    // 

    // 
    return `${ApiUrls['HOST_API-DEV2']}${a[key as keyof typeof a]}`;
  }
}

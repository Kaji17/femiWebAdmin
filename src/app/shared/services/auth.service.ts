import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn : boolean =false
  constructor() { }

  setLogged(log:boolean){
    this.loggedIn = log
  }

  isLoggedIn(){
    return this.loggedIn
  }

}

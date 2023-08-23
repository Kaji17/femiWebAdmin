import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UtilisService {
  listeJour: any = [
    { jour: 'Lundi', key: '1' },
    { jour: 'Mardi', key: '2' },
    { jour: 'Mercredi', key: '3' },
    { jour: 'Jeudi', key: '4' },
    { jour: 'Vendredi', key: '5' },
    { jour: 'Samedi', key: '6' },
    { jour: 'Dimanche', key: '7' },
  ];

  messageError: string = '';

  getMess(): string {
    return this.messageError;
  }

  constructor() {}

  // RECUPERATION DU STATUT DE LA REQUETTE
  response(data: any, cb?: any) {
    let statuscode = data.statusCodeValue;
    switch (statuscode) {
      case 200: {
        if (cb) {
          cb(data.body);
        }
        break;
      }
      case 401: {
        if (cb) {
          cb(data);
        } else {
          this.messageError = 'Unauthorized';
        }

        break;
      }
      case 403: {
        if (cb) {
          cb(data);
        } else {
          this.messageError = 'Forbidden';
        }

        break;
      }
      case 404: {
        if (cb) {
          cb(data);
        } else {
          this.messageError = 'Not Found';
        }

        break;
      }
      default: {
        if (cb) {
          cb(data);
        } else {
          this.messageError = 'Serveur Innacessible';
        }
        break;
      }
    }
  }
}

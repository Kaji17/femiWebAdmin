import { Platform } from '@angular/cdk/platform';
import { Pipe, PipeTransform } from '@angular/core';

import { UtilisService } from 'src/app/shared/services/Utilis.service';


@Pipe({
  name: 'color', pure: true
})
export class ColorPipe implements PipeTransform {
    // statuts: any;
   

 constructor(
    
    private platformService : Platform,
    public utilisService: UtilisService,
    ){
        
    }

  transform(value: any): string {
    let fin = ''
    console.log(value)
   if(value=='Inactive'||value=='Modifié'||value=='Enregistrée'){fin='badge badge-pill badge-info'}
   else if(value=='Accepté'|| value=='Active'|| value=='Validée'||value=='Réglée'){fin='badge badge-pill badge-success'}
   else if(value=='En attente'){fin='badge badge-pill badge-warning'}
   else{fin='badge badge-pill badge-danger'}
    
    return fin
  
    
  }

}
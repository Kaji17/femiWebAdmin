import { Component, OnInit } from '@angular/core';
import { NavConstants } from 'src/app/constants/nav.const';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class RoleModalComponent implements OnInit {
menu:any
  constructor() { }

  ngOnInit(): void {
    this.menu=NavConstants
  }

  checkValue(event,item,module,parent?){
    if(!parent){
      console.log(event.currentTarget.checked);
      item[module]=event.currentTarget.checked
      item.items.map(el=>{
        el[module]=event.currentTarget.checked
      })
    }
    else{
      parent[module] = event.currentTarget.checked
      let litem = parent.items.find(el=>item.label==el.label)
      litem[module]=event.currentTarget.checked
    }
    
    console.log('le nav',this.menu)
  }

}

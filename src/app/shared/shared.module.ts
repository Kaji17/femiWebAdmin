import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ColorPipe } from './pipes/color.pipe';




@NgModule({
  declarations: [
   
    ColorPipe,
    
  ],
  imports: [
    CommonModule,
    
  ],
  exports: [
   
    ColorPipe,
   
  ],
})
export class SharedModule { }

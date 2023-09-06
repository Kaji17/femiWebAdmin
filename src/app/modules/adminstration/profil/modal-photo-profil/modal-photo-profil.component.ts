import { Component, Input, OnInit } from '@angular/core';
import { Configurable } from 'src/app/core/config';

@Component({
  selector: 'app-modal-photo-profil',
  templateUrl: './modal-photo-profil.component.html',
  styleUrls: ['./modal-photo-profil.component.scss']
})
export class ModalPhotoProfilComponent implements OnInit {

  @Input() infoDaTa;

  constructor(
    private configService: Configurable

  ) { }

  ngOnInit(): void {
    console.log("f",this.infoDaTa)
  }

  getImg(src: string) {
    if (src) {
      return src.replace(
        this.configService.get("imgVar"),
        this.configService.get("imgHttp")
      ) as any;
    }
  }

}

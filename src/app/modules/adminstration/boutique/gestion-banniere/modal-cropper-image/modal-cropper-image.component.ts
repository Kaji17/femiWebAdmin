import { Component, Input, OnInit } from '@angular/core';
import { UtilisService } from "src/app/shared/services/utilis.service";
import { MiniBanniereService } from "src/app/shared/services/mini-banniere.service";
import { NgbModal,  ModalDismissReasons, NgbActiveModal, } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-modal-cropper-image',
  templateUrl: './modal-cropper-image.component.html',
  styleUrls: ['./modal-cropper-image.component.scss']
})
export class ModalCropperImageComponent implements OnInit {

  // @Input() infoDaTa;
  croppedImage: any = '';
  imageChangedEvent: any = '';
  constructor(
    private miniBannService: MiniBanniereService,
    private utilitisService: UtilisService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    public activeModal: NgbActiveModal,

  ) { }

  ngOnInit(): void {
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}

  addMiniBanniere(id, file) {
    this.miniBannService.addMiniBaniere(id, file).subscribe({
      next: (data) => {
        this.utilitisService.response(data, (d: any) => {
          console.log("======response", d);
          if (d.status == 200) {
            console.log("======response", d);
            // this.getAllBanniere({
            //   boutiqueid: this.infoUser.body.boutique.id,
            //   pagination: true,
            //   page: 0,
            //   size: 10,
            // });
            // this.infoSwal(true);
          } else {
            // this.infoSwal(false);
          }
        });
      },
    });
  }
    // Fermer le modal
    closeModal() {
      this.activeModal.close();
    }
    // Fermer le modal
    closeModalOk() {
      this.activeModal.close("ok");
    }

//   fileChangeEvent(event: any): void {
//     this.imageChangedEvent = event;
// }
imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
  console.log("ok", this.croppedImage)
  // event.blob can be used to upload the cropped image
}
imageLoaded(image: LoadedImage) {
    // show cropper
}
cropperReady() {
  console.log("ok", this.croppedImage)
}
loadImageFailed() {
    // show message
}

}

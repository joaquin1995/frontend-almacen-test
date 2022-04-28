import { Injectable, TemplateRef } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // public activeModal: BsactiveModal;

  public activeModal: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    // private activeModal: NgbActiveModal,


  ) { }

  openModal(template: TemplateRef<any>) {
    const config = {
      backdrop: true,
      animated: false,
      // ignoreBackdropClick: false // Para que SI se cierre el Modal haciendo click en cualquier parte
      ignoreBackdropClick: true,  // Para que NO se cierre el Modal haciendo click en cualquier parte
      class: 'modal-lg'
    };
    this.activeModal = this.modalService.open(template,
      config
    );
    console.log('openModal', this.activeModal);
  }

  closeModal() {
    console.log('cloaseModal', this.activeModal);
    this.modalService.dismissAll();
    if (!this.activeModal) {
      this.activeModal?.close();
      console.log('cloaseModal modelref', null);
      return;
    }

    this.activeModal.close();
    console.log('cloaseModal hide');
    // this.activeModal = null;

  }


}

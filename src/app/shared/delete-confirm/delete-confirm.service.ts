import { Injectable, NgModuleRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmComponent } from './delete-confirm.component';

@Injectable({
  providedIn: 'root',
})
export class DeleteConfirmService {
  constructor(
    private modalService: NgbModal,
 
  ) {}
  private subject = new Subject<any>();

  public confirmThis(
    title: string,
    message: string,
    btnOkText: string = 'Yes',
    btnCancelText: string = 'No',

    dialogSize: 'sm' | 'lg' = 'sm'
  ): Promise<boolean> {
    const modalRef = this.modalService.open(DeleteConfirmComponent, {
      size: dialogSize,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
   
    return modalRef.result;
  }

  setConfirmation(message: string, yesFn: () => void, noFn: () => void): any {
    const that = this;
    this.subject.next({
      type: 'confirm',
      text: message,
      yesFn(): any {
        that.subject.subscribe(); // This will close the modal
        yesFn();
      },
      noFn(): any {
        that.subject.subscribe();
        noFn();
      },
    });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  close(){
    this.modalService.dismissAll();   
  }
}

import { Component, OnInit,Input } from '@angular/core';
import { DeleteConfirmService } from './delete-confirm.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
    constructor(  
        private confirmDialogService: DeleteConfirmService,
		    private activeModal: NgbActiveModal,
        
    ) { }  
  
  ngOnInit(): any {  

    this.confirmDialogService.getMessage().subscribe(message => {  
	   this.message = message;  
     }); 
    }  
   public decline() {
    this.activeModal.close(false);
   }

   public accept() {
     this.activeModal.close(true);
   }

   public dismiss() {
    this.activeModal.dismiss();
   }
}

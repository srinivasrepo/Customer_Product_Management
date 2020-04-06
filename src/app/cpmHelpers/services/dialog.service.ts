import { Injectable } from "@angular/core";
import { DialogComponent } from '../component/dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { AssignProductComponent } from 'src/app/customer/component/assignProduct.component';

@Injectable()

export class DialogService{

    
    constructor(public _matDialog: MatDialog) {
    }
  
     confirm(message: string ) {
        const modalRef = this._matDialog.open(DialogComponent);       
        modalRef.componentInstance.message = message;       
        return modalRef.afterClosed();
    }


    assign(encCustomerID){
        const modalRef=this._matDialog.open(AssignProductComponent,{
            width:'80%',
            height:'80%'
        });
        modalRef.componentInstance.encCustomerID=encCustomerID;
        return modalRef.afterClosed();
    }


}
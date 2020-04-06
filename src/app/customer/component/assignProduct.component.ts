import { Component, Input } from "@angular/core";
import { Subscription } from 'rxjs'; 
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/common/services/alert.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerMessages } from '../messeges/customerMessages';
import { CommonMethods } from 'src/app/common/utilties/commonMethods';
import { ManageAssignedCustomerProducts } from '../models/customerModels';

@Component({
    templateUrl:'../html/assignproduct.html'
})

export class AssignProductComponent{
    @Input() encCustomerID: string;
    productList: Array<any> = [];

    subscription: Subscription = new Subscription();
    manAsgPro: ManageAssignedCustomerProducts = new ManageAssignedCustomerProducts();

    constructor(private _CustService: CustomerService, private _actRoute: ActivatedRoute,
        private _router: Router, private _notify: AlertService,private _matDialogRef:MatDialogRef<AssignProductComponent>) {
    }

    ngAfterViewInit() {
       
        
        this.subscription = this._CustService.customerSubject.subscribe(resp => {
            if (resp.purpose == "getAssignCustomerProducts"){
                this.productList = resp.result;
                
            }    
            else if (resp.purpose== "manageAssignedProducts" && resp.result=="SUCCESS"){
                this._notify.success(CustomerMessages.ProductAssigned)  
                this.back()
              } 
            else if(resp.purpose== "manageAssignedProducts" && resp.result !="SUCCESS"){
                this._notify.error(CustomerMessages.ProductNotAssigned);
            }    
        })
        this._CustService.getAssignCustomerProducts(this.encCustomerID);
    }

    back() {
        this._matDialogRef.close();
    }

    assign() {
        this.manAsgPro.List = this.productList.filter(obj => CommonMethods.hasValue(obj.isSelect));

if(!CommonMethods.hasValue(this.manAsgPro.List)){
return this._notify.warning(CustomerMessages.NoProductIsSelected)
}

        this.manAsgPro.EncCustomerID = this.encCustomerID;
        this._CustService.manageAssignedProducts(this.manAsgPro);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
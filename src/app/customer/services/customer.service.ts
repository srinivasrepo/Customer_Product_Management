import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

import { CommonMethods } from 'src/app/common/utilties/commonMethods';
import { CustomerServiceUrls } from './customerServiceUrls';
import { CpmHttpService } from 'src/app/common/services/cpmHttp.service';
import { ManageAssignedCustomerProducts, changeStatusModel } from '../models/customerModels';


@Injectable()

export class CustomerService{

    customerSubject:Subject<any> = new Subject();

    constructor(private _cpmHttpService:CpmHttpService){}

    searchCustomer(obj){
       this._cpmHttpService.postDataToService(CommonMethods.formatString(CustomerServiceUrls.searchCustomer,[]),obj)
         .subscribe(res=>{
             this.customerSubject.next({ result : res, purpose: "searchCustomer"});
         })
    }

    getStatusDetails(code){
      this._cpmHttpService.getDataFromService(CommonMethods.formatString(CustomerServiceUrls.getStatusDetails,[code]))
        .subscribe(res=>{
             this.customerSubject.next({result : res, purpose: "getStatusDetails"})
        })
    }

    getCategoryItems(categoryCode){
        this._cpmHttpService.getDataFromService(CommonMethods.formatString(CustomerServiceUrls.getCategoryItems, [categoryCode]))
        .subscribe(res => {
            this.customerSubject.next({ result: res, purpose: categoryCode });
        })
    }

    viewCustomer(code){
       this._cpmHttpService.getDataFromService(CommonMethods.formatString(CustomerServiceUrls.viewCustomer, [code]))
        .subscribe(res=>{
            this.customerSubject.next({result:res, purpose:"viewCustomer"});
        })
    }

    manageCustomer(obj){
        this._cpmHttpService
            .postDataToService(CommonMethods.formatString(CustomerServiceUrls.manageCustomer, []), obj)
            .subscribe(resp => {
                this.customerSubject.next({ result: resp, purpose:"manageCustomer" });
            })
    }

    getAssignCustomerProducts(encCustomerID){
        this._cpmHttpService
        .getDataFromService(CommonMethods.formatString(CustomerServiceUrls.getAssignCustomerProducts, [encCustomerID]))
        .subscribe(resp => {
            this.customerSubject.next({ result: resp, purpose: "getAssignCustomerProducts" });
        })
    }
    manageAssignedProducts(obj:ManageAssignedCustomerProducts){
        this._cpmHttpService
        .postDataToService(CommonMethods.formatString(CustomerServiceUrls.manageAssignedProducts, []), obj)
        .subscribe(resp => {
            this.customerSubject.next({ result: resp, purpose:"manageAssignedProducts" });
        })


    }

    changeStatus(obj:changeStatusModel){
        this._cpmHttpService
            .postDataToService(CommonMethods.formatString(CustomerServiceUrls.changeStatus, []), obj)
            .subscribe(resp => {
                this.customerSubject.next({ result: resp, purpose:"changeStatus" });
            })

    }
}
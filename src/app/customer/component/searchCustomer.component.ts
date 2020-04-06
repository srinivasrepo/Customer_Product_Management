import { Component } from "@angular/core";
import { CustomerService } from '../services/customer.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonMethods } from 'src/app/common/utilties/commonMethods';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/common/services/alert.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/cpmHelpers/services/dialog.service';
import { CustomerMessages } from '../messeges/customerMessages';
import { changeStatusModel, SearchCustomerModel } from '../models/customerModels';

@Component({
    templateUrl:'../html/searchCustomer.html'
})

export class SearchCustomerComponent{

    subscription:Subscription = new Subscription();
    searchCustomerFormGroup: FormGroup;
    searchCustomerModel:SearchCustomerModel=new SearchCustomerModel();
    chanStatObj: changeStatusModel = new changeStatusModel();
    

    totalNumberOfRows: number;
    dataSource: any;
    actions: string[];
    statusList: any[];
    custTypelist: any[];
    headers: any[]=[];
    pageIndex: number=0;

    


    constructor( private _fb:FormBuilder,
        private _customerService:CustomerService,private _notify:AlertService,private _router:Router,
        private _dialogSer:DialogService ){
        this.searchCustomerFormGroup= _fb.group({
            customerName:[''],
            statusID:[''],
            customerTypeId:[''],
        })

    }

    ngAfterViewInit(){
        this._customerService.getStatusDetails("CUST");
        this._customerService.getCategoryItems("CUST");
        this.search("ALL","anEmptyString");
        this.subscription= this._customerService.customerSubject.subscribe(res=>{
            if(res.purpose == "searchCustomer"){
                this.prepareHeaders();
                this.totalNumberOfRows = res.result.totalNumberOfRows;
                this.dataSource = new MatTableDataSource(CommonMethods.increaseSNO(res.result.searchList));
                this.actions = ['Edit', 'Change Status', 'View', 'Assign Products'];
            }
            else if (res.purpose == "getStatusDetails"){
                        this.statusList = res.result;                        
                        
            }            
            else if (res.purpose == "CUST"){
                        this.custTypelist = res.result;
                        
            }
            else if(res.purpose == "changeStatus"){
                if(res.result == "SUCCESS"){
                    this._notify.success(CustomerMessages.statusUpdated);
                    this._customerService.searchCustomer(this.searchCustomerModel);                      
                }
                
            }      
        })


    }

    form() {
        return this.searchCustomerFormGroup.controls;
  }

    search(type, inialization:string){
       
        if (type == 'ALL') {
            this.searchCustomerFormGroup.reset();
            this.searchCustomerModel = new SearchCustomerModel();
      }

      if (type == 'search' && inialization != 'PaginatorEvent') {
         
            if (!CommonMethods.hasValue(this.form().customerName.value || this.form().statusID.value
            || this.form().customerTypeId.value))
           return this._notify.warning(CustomerMessages.enterAlteastOneField)
         
            
            this.searchCustomerModel.customerName = this.form().customerName.value;   
            this.searchCustomerModel.statusID = this.form().statusID.value;
            this.searchCustomerModel.customerType = this.form().customerTypeId.value;
      }

      this._customerService.searchCustomer(this.searchCustomerModel);
}

addNewCustomer() {
      this._router.navigate(['/home/searchCustomer/manageCustomer']);
}

pageEvent(val) {
      this.searchCustomerModel.pageIndex = val.pageIndex;
      this.search('search', 'PaginatorEvent');
}

prepareHeaders() {
      this.headers = [];
      this.headers.push({ columnDef: "sno", header: "S No", cell: (element: any) => `${element.sno}` });
      this.headers.push({ columnDef: "customerCode", header: "Code", cell: (element: any) => `${element.customerCode}` });
      this.headers.push({ columnDef: "customerName", header: "Name", cell: (element: any) => `${element.customerName}` });
      this.headers.push({ columnDef: "status", header: "Status", cell: (element: any) => `${element.status}` });
      this.headers.push({ columnDef: "customerType", header: "Type", cell: (element: any) => `${element.customerType}` });
}


onActionClicked(event) {
    if (event.action == 'Edit')
          this._router.navigate(['/home/searchCustomer/manageCustomer'], { queryParams: { id: event.val.encCustomerID } });
    else if (event.action == 'View'){
        this._router.navigate(['/home/searchCustomer/viewCustomer'], { queryParams: { id: event.val.encCustomerID } });
    }    
    else if (event.action == 'Assign Products'){
          this._dialogSer.assign(event.val.encCustomerID)
    }    

    else if (event.action == 'Change Status') {
        
          this._dialogSer.confirm(CustomerMessages.changeStatus).subscribe(confirmed => {
                if (confirmed) {
                      this.chanStatObj.encID = event.val.encCustomerID;
                      this.chanStatObj.code = "CUSTOMERS";
                      this._customerService.changeStatus(this.chanStatObj);
                }
          })
    }
}

ngOnDestroy() {
    this.subscription.unsubscribe();
}

  
}

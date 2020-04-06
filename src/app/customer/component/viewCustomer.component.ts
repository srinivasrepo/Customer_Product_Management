import { Component, Input } from "@angular/core";
import { Subscription } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CommonMethods } from 'src/app/common/utilties/commonMethods';

@Component({
    templateUrl:'../html/viewCustomer.html'
})

export class ViewCustomerComponent{
    encCustomerID: string;
    customerObj: any;
    dataSource: any;
    Headers:Array<any>=[];

    subscription: Subscription = new Subscription();

  
    constructor(private _CustService: CustomerService, private _actRoute: ActivatedRoute,
    private _router:Router) {}


    ngAfterViewInit() {
        this._actRoute.queryParams.subscribe(param => { this.encCustomerID = param['id'] });
        this.subscription = this._CustService.customerSubject.subscribe(resp => {
            if (resp.purpose == "viewCustomer") {
                this.prepareHeaders();
                this.customerObj = resp.result; 
                               
                this.dataSource=new MatTableDataSource(CommonMethods.increaseSNO(resp.result.addressList));
            }
        })
        this._CustService.viewCustomer(this.encCustomerID);
    }

    back(){
        this._router.navigate(['/home/searchCustomer'])
    }


    prepareHeaders(){
        this.Headers=[];
        this.Headers.push({columnDef:'sno',header:'S No',cell:(element:any)=>`${element.sno}`});
        this.Headers.push({columnDef:'address',header:'address',cell:(element:any)=>`${element.address}`});
        this.Headers.push({columnDef:'countryName',header:'countryName',cell:(element:any)=>`${element.countryName}`});
        this.Headers.push({columnDef:'state',header:'state',cell:(element:any)=>`${element.state}`});
        this.Headers.push({columnDef:'city',header:'city',cell:(element:any)=>`${element.city}`});
        this.Headers.push({columnDef:'zip',header:'zip',cell:(element:any)=>`${element.zip}`});
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}
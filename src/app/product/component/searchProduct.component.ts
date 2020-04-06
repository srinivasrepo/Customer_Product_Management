import { Component } from "@angular/core";
import {HomeComponent} from "../../home/component/home.component"
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/cpmHelpers/services/dialog.service';
import { AlertService } from 'src/app/common/services/alert.service';
import { MatTableDataSource } from '@angular/material/table';
import { CommonMethods } from 'src/app/common/utilties/commonMethods';
import { ProductMessages } from '../messeges/productMessages';
import { SearchProductModel, ChangeStatusProductModel } from '../models/productModels';

@Component({
       templateUrl: '../html/searchProduct.html',
       selector:'app-searchProduct',
})

export class SearchProductComponent{
    searchProductFormGroup: FormGroup;
    totalNumberOfRows: number;
    dataSource:any;
    statusList: Array<any>=[];
    pageIndex:number=0;
    Headers: Array<any>=[];
    actions: Array<string>=[];

    subscription:Subscription = new Subscription();
    searchProductModelObj: SearchProductModel = new SearchProductModel();
    changeStatusModelObj: ChangeStatusProductModel= new ChangeStatusProductModel();

    constructor(private _fb:FormBuilder, private _ProductService:ProductService, private _router:Router,
                private _dialogService:DialogService, private _notify:AlertService){
         this.searchProductFormGroup=_fb.group({
                productName:[''],
                statusId:[''],
         })      
                 
    }

    ngAfterViewInit(){
           this._ProductService.getStatusDetails('PROD');
           this.search('ALL','anEmptyString');
           this.subscription= this._ProductService.productSubject.subscribe(res=>{
                  if(res.purpose == "searchProduct"){
                         this.prepareHeaders();
                         this.totalNumberOfRows=res.result.totalNumberOfRows;
                         this.dataSource = new MatTableDataSource(CommonMethods.increaseSNO(res.result.searchList));
                         this.actions=['Edit', 'Change Status', 'View'];
                  }
                  if(res.purpose == "getStatusDetails"){
                         this.statusList=res.result;
                  }
                  if(res.purpose == "changeStatus"){
                         if(res.result == "SUCCESS"){
                                this._ProductService.searchProduct(this.searchProductModelObj);
                                this._notify.success(ProductMessages.statusupdated)

                         }
                  }
           })
    }


    search(type, init :string){
         if(type == "ALL"){
                this.searchProductFormGroup.reset();
                this.searchProductModelObj = new SearchProductModel();
         }
         if(type == "search" && init !="paginatorEvent"){ 
            if(!CommonMethods.hasValue(this.searchProductFormGroup.controls.productName.value || this.searchProductFormGroup.controls.statusId.value))
               return this._notify.warning(ProductMessages.enterAlteastOneField)

            this.searchProductModelObj.product = this.searchProductFormGroup.controls.productName.value;
            this.searchProductModelObj.statusID = this.searchProductFormGroup.controls.statusId.value;   
         }

         this._ProductService.searchProduct(this.searchProductModelObj);
   
    }

    addNewProduct(){
     this._router.navigate(['/home/searchProduct/manageProduct'])      
    }


    prepareHeaders(){
        this.Headers=[];
        this.Headers.push({"columnDef":"sno", "header":"S No", cell:(element:any)=> `${element.sno}` });
        this.Headers.push({"columnDef":"productCode", "header":"Code", cell:(element:any)=> `${element.productCode}` });
        this.Headers.push({"columnDef":"prodctName", "header":"Name", cell:(element:any)=> `${element.productName}` });
        this.Headers.push({"columnDef":"productCost", "header":"Cost", cell:(element:any)=> `${element.productCost}` });
        this.Headers.push({"columnDef":"status", "header":"Status", cell:(element:any)=> `${element.status}` });
           
    }

    onActionClicked(event){
       
           if(event.action == "View")
             this._router.navigate(['/home/searchProduct/viewProduct'],{queryParams:{id: event.val.encProductID}});
           else if(event.action == "Edit"){

             this._router.navigate(['/home/searchProduct/manageProduct'], {queryParams:{ id: event.val.encProductID}});
           }  
           else{
              this.changeStatusModelObj.code="PRODUCTS";
              this.changeStatusModelObj.encID=event.val.encProductID
              this._ProductService.changeStatus(this.changeStatusModelObj)
           }
                 
    }

    pageEvent(val){

           this.searchProductModelObj.pageIndex=val.pageIndex;
           this.search('search','paginatorEvent')
    }

    ngOnDestroy(){
           this.subscription.unsubscribe();
    }


}
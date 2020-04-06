import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { CpmHttpService } from 'src/app/common/services/cpmHttp.service';
import { CommonMethods } from 'src/app/common/utilties/commonMethods';
import { ProductServiceUrls } from './productServiceUrls';
import { SearchProductModel, ManageProductModel } from '../models/productModels';

@Injectable()

export class ProductService{
    productSubject:Subject<any>=new Subject();

    constructor(private _cpmHttpService:CpmHttpService){}

    searchProduct(obj:SearchProductModel){
        this._cpmHttpService.postDataToService(CommonMethods.formatString(ProductServiceUrls.searchProducts,[]),obj)
         .subscribe(responce=>{
             this.productSubject.next({result:responce,purpose:'searchProduct'})
         })
    }

   getStatusDetails(code){
       this._cpmHttpService.getDataFromService(CommonMethods.formatString(ProductServiceUrls.getStatusDetails,[code]))
          .subscribe(response=>{
              this.productSubject.next({result:response, purpose:"getStatusDetails"}) 
          })
    } 

    manageProduct(obj:ManageProductModel){
        this._cpmHttpService.postDataToService(CommonMethods.formatString(ProductServiceUrls.manageProduct,[]),obj)
          .subscribe(response=>{
              this.productSubject.next({result:response, purpose:"manageProduct"})
          })
    } 

    viewProduct(code){
        
        this._cpmHttpService.getDataFromService(CommonMethods.formatString(ProductServiceUrls.viewProduct,[code]))
          .subscribe(response=>{
            this.productSubject.next({result : response, purpose:"viewProduct"})
            
        })
    }

    changeStatus(obj){
        this._cpmHttpService.postDataToService(CommonMethods.formatString(ProductServiceUrls.changeStatus,[]),obj)
          .subscribe(response=>{
              this.productSubject.next({result : response, purpose:"changeStatus"})
          })
    }
}
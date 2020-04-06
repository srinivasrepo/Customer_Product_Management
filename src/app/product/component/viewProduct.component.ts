import { Component } from "@angular/core";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
       templateUrl: '../html/viewProduct.html'
})

export class ViewProductComponent{

       encProductID:any;
       productObj:any=[];
       subscription:Subscription = new Subscription();

       constructor(private _activatedRoute:ActivatedRoute, private _productService:ProductService, private _router:Router){
       }

       ngAfterContentInit(){
              this._activatedRoute.queryParams.subscribe(param => {this.encProductID=param.id});
              
              this.subscription = this._productService.productSubject.subscribe(res=>{
                     if(res.purpose=="viewProduct"){
                            this.productObj = res.result;
                     }
              })


              this._productService.viewProduct(this.encProductID);

       }
       goBack(){
          this._router.navigate(['/home/searchProduct']);
       }
       ngOnDestroy(){
              this.subscription.unsubscribe();
       }
}
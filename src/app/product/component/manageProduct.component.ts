import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AlertService } from 'src/app/common/services/alert.service';
import { Subscription } from 'rxjs';
import { ProductMessages } from '../messeges/productMessages';
import { CommonMethods } from 'src/app/common/utilties/commonMethods';
import { ManageProductModel } from '../models/productModels';

@Component({
       templateUrl: '../html/manageProduct.html'
})

export class ManageProductComponent{

  manageProductFormGroup: FormGroup;
  manageProductModelObj:ManageProductModel = new ManageProductModel();

  subscription:Subscription = new Subscription();

  encProductID:string;
  toggleButtonName:string;


  constructor(private _fb:FormBuilder, private _router:Router, private _productService:ProductService,
              private _notify:AlertService, private _actRoute:ActivatedRoute){
    this.manageProductFormGroup= _fb.group({
       productName:[''],
       productCost:[''],
       description:['']
    })  
  }

  
  ngAfterContentInit(){
       
         
     this._actRoute.queryParams.subscribe(param=> {
            this.encProductID = param['id']
       });    

     this.subscription = this._productService.productSubject.subscribe(res=>{
           
       if(res.purpose == "manageProduct"){
                   if(res.result == "SUCCESS"){

                          if(this.encProductID){
                            this._notify.success(ProductMessages.updated)
                          }
                          else
                            this._notify.success(ProductMessages.saved)
                   }
                   else
                     this._notify.warning(ProductMessages.notSaved)          
            }

       if(res.purpose == "viewProduct"){
                 
              this.formControlsShortcut().productName.setValue(res.result.productName);
              this.formControlsShortcut().productCost.setValue(res.result.productCost);
              this.formControlsShortcut().description.setValue(res.result.description);
            }       
     })

     if(CommonMethods.hasValue(this.encProductID)){
            this._productService.viewProduct(this.encProductID);
            this.toggleButtonName = "UPDATE";
            this.manageProductFormGroup.disable();
            
     }
     else this.toggleButtonName = "SAVE PRODUCT"

  }
  
  formControlsShortcut(){
       
         return this.manageProductFormGroup.controls;
  }

  saveProduct(){

       if(this.toggleButtonName == "UPDATE" ){
              this.manageProductFormGroup.enable();
              this.toggleButtonName = "SAVE PRODUCT";
              return;
       }

       var ManageProductMessages = this.validations();
       if (CommonMethods.hasValue(ManageProductMessages))
           return this._notify.warning(ManageProductMessages); 

      this.manageProductModelObj.encProductID= this.encProductID; 
      this.manageProductModelObj.productName= this.formControlsShortcut().productName.value;
      this.manageProductModelObj.productCost=this.formControlsShortcut().productCost.value;
      this.manageProductModelObj.description=this.formControlsShortcut().description.value;

      this._productService.manageProduct(this.manageProductModelObj);
      
      this.formControlsShortcut().productName.setValue('');
      this.formControlsShortcut().productCost.setValue('')
      this.formControlsShortcut().description.setValue('')
  }

  validations() {
       if (!CommonMethods.hasValue(this.manageProductFormGroup.controls.productName.value))
           return ProductMessages.productNameEmpty;
       var nameReg = /^[A-Za-z\s]+$/;
       if (!nameReg.test(this.manageProductFormGroup.controls.productName.value))
           return ProductMessages.productName;

       if (!CommonMethods.hasValue(this.manageProductFormGroup.controls.productCost.value))
           return ProductMessages.productCostEmpty;
       var costRegex = /^\d+$/;
       if (!costRegex.test(this.manageProductFormGroup.controls.productCost.value))
           return ProductMessages.productCost;

       if (!CommonMethods.hasValue(this.manageProductFormGroup.controls.description.value))
           return ProductMessages.description;
   }


  goBack(){
         this._router.navigate(['/home/searchProduct'])
  }

 ngOnDestroy(){
        this.subscription.unsubscribe();
 }
}

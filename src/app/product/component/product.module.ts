import { NgModule } from "@angular/core";
import { ProductRoutingModule } from './product-routing.module';
import { AppMaterialModule } from 'src/app/appMaterial.module';
import { SearchProductComponent } from './searchProduct.component';
import { ManageProductComponent } from './manageProduct.component';
import { ViewProductComponent } from './viewProduct.component';
import { ProductService } from '../services/product.service';
import { CpmHelpersModule } from 'src/app/cpmHelpers/component/cpmHelpers.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
    declarations:[
        SearchProductComponent,
        ManageProductComponent,
        ViewProductComponent,


    ],
    imports:[
        ProductRoutingModule,
        AppMaterialModule,
        CpmHelpersModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule
        
    ],
    providers:[ProductService],

})

export class ProductModule{

} 
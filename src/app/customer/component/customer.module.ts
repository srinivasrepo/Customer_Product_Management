import { NgModule } from "@angular/core";
import { CustomerRoutingModule } from './customer-routing.module';
import { AppMaterialModule } from 'src/app/appMaterial.module';
import { CpmHelpersModule } from 'src/app/cpmHelpers/component/cpmHelpers.module';
import { ManageCustomerComponent } from './manageCustomer.component';
import { SearchCustomerComponent } from './searchCustomer.component';
import { ViewCustomerComponent } from './viewCustomer.component';
import { AssignProductComponent } from './assignProduct.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonMethods } from 'src/app/common/utilties/commonMethods';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { DialogService } from 'src/app/cpmHelpers/services/dialog.service';

@NgModule({
    declarations:[SearchCustomerComponent,ManageCustomerComponent,ViewCustomerComponent,AssignProductComponent],
    imports:[
        CustomerRoutingModule,
        AppMaterialModule,
        CpmHelpersModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ],
    providers:[CustomerService,DialogService]    
}) 

export class CustomerModule{
}
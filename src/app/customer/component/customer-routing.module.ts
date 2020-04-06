import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { SearchCustomerComponent } from './searchCustomer.component';
import { ManageCustomerComponent } from './manageCustomer.component';
import { ViewCustomerComponent } from './viewCustomer.component';
import { AssignProductComponent } from './assignProduct.component';


export const CustRoutes:Routes=[
    {path:'searchCustomer',component:SearchCustomerComponent},
    {path:'manageCustomer',component:ManageCustomerComponent},
    {path:'viewCustomer',component:ViewCustomerComponent},

]

@NgModule({
    imports:[RouterModule.forRoot(CustRoutes)],
    exports:[RouterModule]
})

export class CustomerRoutingModule{

}

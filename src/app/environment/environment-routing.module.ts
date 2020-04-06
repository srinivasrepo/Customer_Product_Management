import { Routes, RouterModule } from "@angular/router";
import { NgModule} from '@angular/core';
import { HomeComponent } from '../home/component/home.component';
import { SearchProductComponent } from '../product/component/searchProduct.component';
import { ProdRoutes } from '../product/component/product-routing.module';
import { CustRoutes } from '../customer/component/customer-routing.module';
import { SearchCustomerComponent } from '../customer/component/searchCustomer.component';

const Envroutes : Routes =[
    {path:'home', component:HomeComponent,
    children: [
        { path: 'searchProduct', component: SearchProductComponent },
        {path:'searchProduct',children:ProdRoutes},
  
        { path: 'searchCustomer', component: SearchCustomerComponent },
        {path: 'searchCustomer', children: CustRoutes },
      ]
    }
];

@NgModule({
    imports:[RouterModule.forRoot(Envroutes)],
    exports:[RouterModule],
   
})

export class EnvironmentRoutingModule {
    
}
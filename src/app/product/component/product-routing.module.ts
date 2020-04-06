import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { SearchProductComponent } from './searchProduct.component';
import { ManageProductComponent } from './manageProduct.component';
import { ViewProductComponent } from './viewProduct.component';

export const ProdRoutes:Routes=[
    {path:'home/searchProduct',component:SearchProductComponent},
    {path:'manageProduct',component:ManageProductComponent},
    {path:'viewProduct',component:ViewProductComponent},
];

@NgModule({
    imports:[RouterModule.forRoot(ProdRoutes)],
    exports:[RouterModule]
})

export class ProductRoutingModule{ }
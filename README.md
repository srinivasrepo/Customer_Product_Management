<!------------- ALL MODULES IN THIS PROJECT ARE ------------------>
#(1)# app.module.ts({
        declarations: [AppComponent],
        imports: [
            BrowserModule,
            AppRoutingModule,
    #(2A)#  EnvironmentModule,
    #(2B)#  LoginModule
          # NotifierModule
          # HttpClientModule
        ],
        providers: [CpmHttpService,AlertService],
        bootstrap: [AppComponent]
   })
------

#(2A)#  EnvironmentModule ({
        declarations: [HomeComponent,DialogComponent],
        imports: [
            EnvironmentRoutingModule,
    #(3A)#  ProductModule,
    #(3B)#  CustomerModule,
    #(3C)#  AppMaterialModule,
            CommonModule
        ],
        providers: [DialogServive],
        entryComponents: [DialogComponent]
  })     
-------

 #(2B)#  LoginModule({
        declarations: [LoginComponent],
        imports: [
    #(3C)#  AppMaterialModule,
            ReactiveFormsModule,
            CommonModule,
            FormsModule
        ],
        providers: [LoginService],
             
 })
------

 #(3A)#  ProductModule({
        declarations: [SearchProductComponent,ManageProductComponent,ViewProductComponent],
        imports: [
    #(3C)#  AppMaterialModule,
    #(4A)#  CpmHelpersModule,
            ProductRoutingModue,ReactiveFormsModule,FormsModule,CommonMOdule
        ],
        providers: [ProductService],
 })
------

 #(3B)#  CustomerModule({
        declarations: [SearchCustomerComponent,ManageCustomerComponent,ViewCustomerComponent,AssignProductComponent],
        imports: [
    #(3C)#  AppMaterialModule,
    #(4A)#  CpmHelpersModule,
            ProductRoutingModue,ReactiveFormsModule,FormsModule,CommonMOdule
        ],
        providers: [CustomerService,DialogService],
 }) 
------

 #(3C)#  AppMaterialModule({
        imports: [All_angular_material_api_imports_here],
        exports: [All_angular_material_api_exports_here] 
 }) 
-----

 #(4A)#  CpmHelpersModule({
        declarations: [CustomerGridComponent,DialogComponent],
        imports: [
    #(3C)#  AppMaterialModule,
            CommonMOdule
        ],
        exports: [CustomerGridComponet],
 })  
-----

#*# Common( 
      >services
        -alert.service.ts
        -CpmHttp.service.ts
      
      >utilities
        -commonMethods.ts
)
-----

#*# CpmHelpers( 
      >component
        -cpmHelpers.module.ts
        -cpmHelpers.component.ts
        -cpmGrid.component.ts
        -dialog.component.ts
      
      >html
        -cpmGrid.html
        -dialog.html

      >services
        -dialog.service.ts 
)
---------                
<!---------------------------------------------------------------->


<!---------- ALL ROUTING-MODULES IN THIS PROJECT ARE ------------->
(1) app-routing.module.ts

    const routes: Routes = [

    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
-------------

(2) environment-routing.module.ts

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
----------

(3) product-routing.module.ts

export const ProdRoutes:Routes=[
    {path:'searchProduct',component:SearchProductComponent},
    {path:'manageProduct',component:ManageProductComponent},
    {path:'viewProduct',component:ViewProductComponent},
];

@NgModule({
    imports:[RouterModule.forRoot(ProdRoutes)],
    exports:[RouterModule]
})
---------

(4) customer-routing.module.ts

export const CustRoutes:Routes=[
    {path:'searchCustomer',component:SearchCustomerComponent},
    {path:'manageCustomer',component:ManageCustomerComponent},
    {path:'viewCustomer',component:ViewCustomerComponent},
    {path:'assignProduct',component:AssignProductComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(CustRoutes)],
    exports:[RouterModule]
})
--------
<!---------------------------------------------------------------->  

<!------------ ALL ROUTING LINKS IN THIS PROJECT ARE -------------->   
(1) app.component.html(
<notifier-container></notifier-container>
<router-outlet></router-outlet>
)
-----
(2)login.component.ts(
    this._router.navigate(["/home"]);
)
-----
(3)home.component.html(
      <a routerLink="searchProduct">Product Module</a>
      <a routerLink="searchCustomer">Customer Module</a>
      <router-outlet></router-outlet>
)
-----
(4A1)searchProduct.component.ts(
      this._router.navigate(['/home/searchProduct/viewProduct'],{queryParams:{id: event.val.encProductID}});
      this._router.navigate(['/home/searchProduct/manageProduct'], {queryParams:{ id: event.val.encProductID}});
)
-----
(4A2)manageProduct.component.ts(
      this._router.navigate(['/home/searchProduct'])
)
------
(4B1)searchCustomer.component.ts(
      this._router.navigate(['/home/searchCustomer/manageCustomer'], { queryParams: { id: event.val.encCustomerID } });
      this._router.navigate(['/home/searchCustomer/viewCustomer'], { queryParams: { id: event.val.encCustomerID } });
      this._dialogSer.assign(event.val.encCustomerID);
      this._dialogSer.confirm(CustomerMessages.changeStatus).subscribe(confirmed => {
                if (confirmed) {
                      this.chanStatObj.encID = event.val.encCustomerID;
                      this.chanStatObj.code = "CUSTOMERS";
                      this._customerService.changeStatus(this.chanStatObj);
                }
      });
)
-----
(4B2)manageCustomer.component.ts(
    this._router.navigate(['/home/searchCustomer'])
)
------
(5)dialog.service.ts(
    constructor(public _matDialog: MatDialog) {
    }
  
     confirm(message: string ) {
        const modalRef = this._matDialog.open(DialogComponent);       
        modalRef.componentInstance.message = message;       
        return modalRef.afterClosed();
    }

    assign(encCustomerID){
        const modalRef=this._matDialog.open(AssignProductComponent,{
            width:'80%',
            height:'80%'
        });
        modalRef.componentInstance.encCustomerID=encCustomerID;
        return modalRef.afterClosed();
    }
)
------
(*) dialog.component.ts

export class DialogComponent{
    @Input() message: string;    
     
    constructor( public dialogRef: MatDialogRef<DialogComponent>) {    }

    proceed() {
        this.dialogRef.close(true);
    }
    cancel() {
        this.dialogRef.close(false);
    }
}
<!---------------------------------------------------------------->  























# CustomerProductManagement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

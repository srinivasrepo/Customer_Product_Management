import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { CommonMethods } from 'src/app/common/utilties/commonMethods';
import { Subscription, from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/common/services/alert.service';
import { CustomerMessages } from '../messeges/customerMessages';
import { CustomerAddressListModel, ManageCustomerModel } from '../models/customerModels';


@Component({
    templateUrl:'../html/manageCustomer.html'
})

export class ManageCustomerComponent{
  
    manageCustomerFormGroup:FormGroup;
    subscription:Subscription = new Subscription();
    customerAddressListModelObj:CustomerAddressListModel = new CustomerAddressListModel();
    manageCustomerModelObj:ManageCustomerModel = new ManageCustomerModel();

    encCustomerID:string;
    countryList: any[];
    custTypelist: any[];
    headers: any[];
    dataSource: any=[];
    addressListArray: Array<any>=[];
    actions: Array<string>;
    id: number = -1;
    togglingButton: string = 'SAVE CUSTOMER';

    constructor(private _fb:FormBuilder, private _router:Router, private _custService:CustomerService, 
                private _actRoute:ActivatedRoute, private _notify:AlertService){
       this.manageCustomerFormGroup = _fb.group({
        customerName:['',[Validators.required]],
        CustomerTypeid: ['',[Validators.required]],
            address: ['',[Validators.required]],
            country: ['',[Validators.required]],
            stateName: ['',[Validators.required]],
            city: ['',[Validators.required]],
            zip: ['',[Validators.required]],
       }) 
    }

    ngOnInit(){
        
    }
    ngAfterContentInit(){
        console.log(this.dataSource);
        console.log(this.addressListArray);
        
        this.actions = ['Edit', 'Delete'];
        this._actRoute.queryParams.subscribe(param => { this.encCustomerID = param['id'] });
        this._custService.getCategoryItems("COUN");
        this._custService.getCategoryItems("CUST");
        this.prepareHeaders();

        if (CommonMethods.hasValue(this.encCustomerID)) {
            this._custService.viewCustomer(this.encCustomerID);
            this.togglingButton = "UPDATE";
            this.manageCustomerFormGroup.disable();          
        }
       
        this.subscription= this._custService.customerSubject.subscribe(res=>{    
            if (res.purpose == "COUN")
            this.countryList = res.result;
        else if (res.purpose == "CUST")
            this.custTypelist = res.result;

        else if (res.purpose == "viewCustomer") {
            this.form().customerName.setValue(res.result.customerName);
            this.form().CustomerTypeid.setValue(res.result.customerTypeID);
            this.addressListArray = res.result.addressList;
            this.dataSource = CommonMethods.increaseSNO(this.addressListArray);
            this.prepareHeaders();

            }
            
        if (res.purpose == "manageCustomer") {
            if (res.result == "SUCCESS") {
                this._router.navigate(['/home/searchCustomer']);
                this._notify.success(CustomerMessages.saved);
            }
            else
                this._notify.error(CustomerMessages.notSaved);
            }    
        })
        
        
    }

    form(){
   return    this.manageCustomerFormGroup.controls;
    }

    prepareHeaders(){
        this.headers = [];
        this.headers.push({ columnDef: 'sno', header: 'sno', cell: (element: any) => `${element.sno}` });
        this.headers.push({ columnDef: 'address', header: 'address', cell: (element: any) => `${element.address}` });
        this.headers.push({ columnDef: 'countryName', header: 'countryName', cell: (element: any) => `${element.countryName}` });
        this.headers.push({ columnDef: 'state', header: 'state', cell: (element: any) => `${element.state}` });
        this.headers.push({ columnDef: 'city', header: 'city', cell: (element: any) => `${element.city}` });
        this.headers.push({ columnDef: 'zip', header: 'zip', cell: (element: any) => `${element.zip}` });

    }

    addAddress(){

        var errMsg = this.validateAddAddress();

        if (CommonMethods.hasValue(errMsg))
            return this._notify.warning(errMsg);

        this.customerAddressListModelObj.address = this.form().address.value;
        this.customerAddressListModelObj.country = this.form().country.value;
        this.customerAddressListModelObj.countryName = (this.countryList
            .filter(obj => (obj.catItemID == this.form().country.value)))[0].catItem
        this.customerAddressListModelObj.state = this.form().stateName.value;
        this.customerAddressListModelObj.city = this.form().city.value;
        this.customerAddressListModelObj.zip = this.form().zip.value;

        
        if (this.id == -1) {
            this.addressListArray.push(this.customerAddressListModelObj);              
        }
        else {       
            this.addressListArray.splice(this.id, 0, this.customerAddressListModelObj);
        }
console.log(this.addressListArray);

        this.dataSource =new MatTableDataSource(CommonMethods.increaseSNO(this.addressListArray));
        this.form().address.setValue('');
        this.form().country.setValue('');
        this.form().stateName.setValue('');
        this.form().city.setValue('');
        this.form().zip.setValue('');
        this.id = -1;
        this.prepareHeaders();
    }

    validateAddAddress(){
        if(this.togglingButton == "UPDATE"){
            return CustomerMessages.clickUpdateToEdit;
        }
        if (!CommonMethods.hasValue(this.form().address.value))
            return CustomerMessages.address;
        if (!CommonMethods.hasValue(this.form().country.value))
            return CustomerMessages.country;
        if (!CommonMethods.hasValue(this.form().stateName.value))
            return CustomerMessages.state;
        if (!CommonMethods.hasValue(this.form().city.value))
            return CustomerMessages.city;
        if (!CommonMethods.hasValue(this.form().zip.value))
            return CustomerMessages.zip;
        var zipRegex = /^[0-9]{6}$/;
        if (!zipRegex.test(this.form().zip.value))
            return CustomerMessages.OnlyNumbers;
        var checkZip = this.addressListArray.filter(obj => obj.zip == this.form().zip.value);
        if (checkZip.length > 0 && this.id == -1)
            return CustomerMessages.alreadyExists;        
    }

onActionClicked(event){
    if (event.action == "Edit") {
        this.id = event.val.sno - 1;
        this.form().address.setValue(event.val.address);
        this.form().country.setValue(event.val.country);
        this.form().stateName.setValue(event.val.state);
        this.form().city.setValue(event.val.city);
        this.form().zip.setValue(event.val.zip);
    }
    else {
        var i = event.val.sno - 1;
        this.addressListArray.splice(i, 1);
        this.dataSource = new MatTableDataSource(CommonMethods.increaseSNO(this.addressListArray));
    }

}



    saveCustomer(){
        if (this.togglingButton == "UPDATE") {
            this.togglingButton = "SAVE CUSTOMER";
            this.manageCustomerFormGroup.enable();
            return;
        }
        var errMsg = this.validateSaveCustomer();
        if (CommonMethods.hasValue(errMsg))
            return this._notify.warning(errMsg);

        this.manageCustomerModelObj.encCustomerID = this.encCustomerID;
        this.manageCustomerModelObj.customerName = this.form().customerName.value;
        this.manageCustomerModelObj.customerType = this.form().CustomerTypeid.value;
        this.manageCustomerModelObj.List = this.dataSource.data;
        this._custService.manageCustomer(this.manageCustomerModelObj);

    }

    validateSaveCustomer(){
        if (!CommonMethods.hasValue(this.form().customerName.value))
            return CustomerMessages.enterName
        if (!CommonMethods.hasValue(this.form().CustomerTypeid.value))
            return CustomerMessages.selectType
        if (!CommonMethods.hasValue(this.dataSource && this.dataSource.data))
            return CustomerMessages.addressColumn
    }


    goBack(){
       return this._router.navigate(['/home/searchCustomer'])
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}






// @Component({
//     templateUrl: '../html/manageCustomer.html',
// })

// export class ManageCustomerComponent {
//     Headers : Array<any>= [];
//     actions : Array<any> = [];
//     manageCustForm: FormGroup;
//     subscription: Subscription = new Subscription();
//     manageCustObj: ManageCustomerModel = new ManageCustomerModel();
//     CustaddressObj: CustomerAddressListModel = new CustomerAddressListModel();
//     encCustomerID: string;
//     addresslistArray: any[] = [];
//     dataSource: any;
//     custmerlist: any;
//     countryList: any;
//     id: number = -1;
//     enableBtn : string = 'SAVE';
//     isDisablebttn : boolean = true;


//     constructor(private _fb: FormBuilder, private rc: Router, private _alertServices: AlertService,
//         private _ac: ActivatedRoute, private _custServ: CustomerService) {

//         this.manageCustForm = this._fb.group({
//             cname: ['', [Validators.required]],
//             type: ['', [Validators.minLength(7)]],
//             maddress: ['', [Validators.required]],
//             mcountry: ['', [Validators.required]],
//             mstate: ['', [Validators.required]],
//             mcity: ['', [Validators.required]],
//             mzip: ['', [Validators.required]]
//         })
//     }

//     ngAfterContentInit() {
//         this._ac.queryParams.subscribe(params => this.encCustomerID = params['id']);
//         this.subscription = this._custServ.customerSubject.subscribe(resp => {
//             if (resp.purpose == "manageCustomer") {
//                 if (resp.result == 'SUCCESS') {  
//                     this.back();
//                 if(this.encCustomerID)
//                     this._alertServices.success(CustomerMessages.modified);
//                 else 
//                     this._alertServices.success(CustomerMessages.saved);
//                 }
//                 else 
//                     this._alertServices.error(CustomerMessages.notSaved)
//             }
//             else if (resp.purpose == "CUST") 
//                 this.custmerlist = resp.result;
//             else if (resp.purpose == "COUN") 
//                 this.countryList = resp.result;            
//             else if (resp.purpose == 'viewCustomer') {
//                 this.manageCustForm.controls.cname.setValue(resp.result.customerName);
//                 this.manageCustForm.controls.type.setValue(resp.result.customerTypeID);
//                 this.addresslistArray = resp.result.addressList;
//                 this.dataSource = new MatTableDataSource(CommonMethods.increaseSNO(this.addresslistArray));
//                 this.prepareHeaders();
//                 this.actions = [];       
//             }
//         })

//         this._custServ.getCategoryItems('COUN');
//         this._custServ.getCategoryItems('CUST');

//         if (CommonMethods.hasValue(this.encCustomerID)){
//             this._custServ.viewCustomer(this.encCustomerID);
//             this.enableBtn = 'UPDATE';
//             this.manageCustForm.disable();
//             this.isDisablebttn = false;
            
//         }
//     }
           

//     save() {
//         if (this.enableBtn == 'SAVE') {
//         var saveVal = this.validateSaveCustomer();
//         if (CommonMethods.hasValue(saveVal)){
//             this._alertServices.warning(saveVal);
//         }
            
//         this.manageCustObj = new ManageCustomerModel();
//         this.manageCustObj.encCustomerID = this.encCustomerID;
//         this.manageCustObj.customerName = this.manageCustForm.controls.cname.value;
//         this.manageCustObj.customerType = this.manageCustForm.controls.type.value;
//         this.manageCustObj.List = this.dataSource.data;
//         this._custServ.manageCustomer(this.manageCustObj);
//     }
//         if(this.enableBtn =='UPDATE' ){
//             this.enableBtn = 'SAVE';
//             this.manageCustForm.enable();
//             this.isDisablebttn = true;
//             this.actions = ['Edit', 'Delete'];
//         }
//     }

//     add() {
//         var saveVal = this.addressFieldValidations();
//         if (CommonMethods.hasValue(saveVal))
//             return this._alertServices.warning(saveVal);
//         this.CustaddressObj.address = this.manageCustForm.controls.maddress.value;
//         this.CustaddressObj.country = this.manageCustForm.controls.mcountry.value;
//         this.CustaddressObj.countryName = this.countryList.filter(obj => obj.catItemID =this.manageCustForm.controls.mcountry.value)[0].catItem;                                            
//         this.CustaddressObj.state = this.manageCustForm.controls.mstate.value;
//         this.CustaddressObj.city = this.manageCustForm.controls.mcity.value;
//         this.CustaddressObj.zip = this.manageCustForm.controls.mzip.value;

//         if (this.id == -1) {
//             this.addresslistArray.push(this.CustaddressObj);
//             this.actions = ['Edit', 'Delete'];        }           
//         else{
//             this.addresslistArray[this.id] = this.CustaddressObj; 
//         }
            
//         this.dataSource = new MatTableDataSource(CommonMethods.increaseSNO(this.addresslistArray));
//         this.CustaddressObj = new CustomerAddressListModel();    
            
//         this.manageCustForm.controls.maddress.setValue('');
//         this.manageCustForm.controls.mcountry.setValue('');
//         this.manageCustForm.controls.mstate.setValue('');
//         this.manageCustForm.controls.mcity.setValue('');
//         this.manageCustForm.controls.mzip.setValue('');
//         this.id = -1;
//         this.prepareHeaders();
//     }

//     edit(element,i ) {
//         this.id = i;       
//         this.manageCustForm.controls.maddress.setValue(element.address);
//         this.manageCustForm.controls.mcountry.setValue(element.country);
//         this.manageCustForm.controls.mstate.setValue(element.state);
//         this.manageCustForm.controls.mcity.setValue(element.city);
//         this.manageCustForm.controls.mzip.setValue(element.zip);
//     }


//     back() {
//         this.rc.navigate(['/home/searchCustomer']);
//     }

//     validateSaveCustomer(){
//         if (!CommonMethods.hasValue(this.form().cname.value))
//             return CustomerMessages.enterName
//         if (!CommonMethods.hasValue(this.form().type.value))
//             return CustomerMessages.selectType
//         if (!CommonMethods.hasValue(this.dataSource && this.dataSource.data))
//             return CustomerMessages.addressColumn
//     }
//     form(){
//            return    this.manageCustForm.controls;
//             }

//     addressFieldValidations() {
//         if(this.enableBtn == "UPDATE"){
//             return CustomerMessages.clickUpdateToEdit;
//         }
//         if (!CommonMethods.hasValue(this.form().maddress.value))
//             return CustomerMessages.address;
//         if (!CommonMethods.hasValue(this.form().mcountry.value))
//             return CustomerMessages.country;
//         if (!CommonMethods.hasValue(this.form().mstate.value))
//             return CustomerMessages.state;
//         if (!CommonMethods.hasValue(this.form().mcity.value))
//             return CustomerMessages.city;
//         if (!CommonMethods.hasValue(this.form().mzip.value))
//             return CustomerMessages.zip;
//         var zipRegex = /^[0-9]{6}$/;
//         if (!zipRegex.test(this.form().mzip.value))
//             return CustomerMessages.OnlyNumbers;
//         var checkZip = this.addresslistArray.filter(obj => obj.zip == this.form().zip.value);
//         if (checkZip.length > 0 && this.id == -1)
//             return CustomerMessages.alreadyExists;
        
//     }

//     prepareHeaders() {
//         this.Headers = [];
//         this.Headers.push({ "columnDef": "s.no", "header": "S.No", cell: (element: any) => `${element.sno}`});
//         this.Headers.push({ "columnDef": 'address', "header": "Address", cell: (element: any) => `${element.address}`});
//         this.Headers.push({ "columnDef": 'country', "header": "Country", cell: (element: any) => `${element.countryName}`});
//         this.Headers.push({ "columnDef": 'state', "header": "State", cell: (element: any) => `${element.state}`});
//         this.Headers.push({ "columnDef": 'city', "header": "City", cell: (element: any) => `${element.city}`});
//         this.Headers.push({ "columnDef": 'zip', "header": "Zip-Code", cell: (element: any) => `${element.zip}`});
//     }

//     onActionClicked(event) {
//         if (event.action == "edit"){
//            this.edit(event.val,event.val.sno -1);
//            console.log(event.val.sno -1);                
//         } 
//         else if (event.action == "delete"){
//                 this.addresslistArray.splice(event, 1);
//                 this.dataSource = new MatTableDataSource(this.addresslistArray);  
//         }
//     }

//     ngOnDestroy() {
//         this.subscription.unsubscribe();
//     }
    
// }


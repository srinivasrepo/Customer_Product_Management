export class CustomerAddressListModel{
    addressID:number;
    address:string;
    country:number;
    countryName:string;
    state:string;
    city:string;
    zip:string;
  }
  
  
  export class ManageCustomerModel{
  
    customerID: number;
    encCustomerID: string;
    customerName: string;
    customerType: number;
    List: Array<CustomerAddressListModel>=[];
  }
  
  
  export class ManageAssignedCustomerProducts{
    EncCustomerID:string;
    List:Array<any>=[];
    CustomerID:number;
  }
  
export class SearchCustomerModel{
  customerName: string;
  statusID: number;
  customerType: string;
  pageIndex: number;
  pageSize: number;
}

export class changeStatusModel{
    encID:string;
    code:string;
}  
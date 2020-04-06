export class ChangeStatusProductModel{
    code:string;
    encID:string;
 
 }

 export class ManageProductModel{
    encProductID:string;
    productName:string;
    productCost:number;
    description:string;
}

export class SearchProductModel{

    product: string;
    statusID: number;
    pageIndex: number;
    pageSize: string;
}


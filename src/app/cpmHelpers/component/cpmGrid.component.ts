import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonMethods } from 'src/app/common/utilties/commonMethods';


@Component({
    selector:'grid',
    templateUrl:'../html/cpmGrid.html',
})

export class CpmGridComponent{
    @Input() headers:any=[];
    displayedColumns:any = [];
    @Input() dataSource:any = [];
    @Input() actions: any = [];
    filteredArray: Array<any>=["View","Change Status"];
    @Output() onActionClicked: EventEmitter<any> = new EventEmitter();
    actionIcons: Map<string, string> = new Map<string, string>();
    actionToolTip: Map<string, string>= new Map<string, string>();
    
    constructor(){
        
        this.actionIcons.set("Edit","edit");
        this.actionIcons.set("Change Status","swap_horiz");
        this.actionIcons.set("Assign Products","add_shopping_cart");
        this.actionIcons.set("View","visibility");
        this.actionIcons.set("Delete","delete_forever");

        this.actionToolTip.set("Assign Products","Assign Products");
        this.actionToolTip.set("Edit","Edit");
        this.actionToolTip.set("Delete","Delete");
        this.actionToolTip.set("Change Status","Change Status");
        this.actionToolTip.set("View","View");    
    }


    ngOnChanges(){      
        

        if(CommonMethods.hasValue(this.actions)){
            
            this.displayedColumns = this.headers.map( (header) => header.columnDef).concat(['actions']);            
        }
        else{
        
         return   this.displayedColumns = this.headers.map((c => c.columnDef));
        }
    }

    filterActions(row){       

        if(row.status == "In-Active")
           return this.filteredArray;
        else
           return this.actions;   
    }

    OnActionClick(action:any, dataItem:any){
        this.onActionClicked.emit({ action:action, val:dataItem });
    }
   
}
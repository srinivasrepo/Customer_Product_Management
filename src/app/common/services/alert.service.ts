import { Injectable } from "@angular/core";
import { NotifierService } from 'angular-notifier';

@Injectable()

export class AlertService{
    constructor(private _notify:NotifierService){}

    success(str:string){
         this._notify.notify('success',str);
    }
    
    warning(str: string){
        this._notify.notify('warning',str)
    }

    error(str:string){
        this._notify.notify('error',str)
    }

}
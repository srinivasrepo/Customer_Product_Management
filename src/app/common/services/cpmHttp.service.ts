import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ThrowStmt } from '@angular/compiler';

@Injectable()

export class CpmHttpService{
    observables: Observable<any>;

    constructor(private _http:  HttpClient){
    }

    getDataFromService(url:string, headers:HttpHeaders=null, isLocalFileAcessing: boolean=false): Observable<any>{
           return this._http.get( this.getUrl(isLocalFileAcessing, url), {headers : headers} )
    }
    

    getUrl(isLocalFileAcessing:boolean, url:string){
        localStorage.setItem('isGetUrlWorking','yes');
        if(!isLocalFileAcessing) {
            url = environment.baseUrl + url ;
        }
        return url;
    }

    postDataToService(url:string, body:any, headers:HttpHeaders=null):Observable<any>{
        localStorage.setItem('isPostUrlWorking','Yes');
        this.observables=this._http.post(environment.baseUrl + url, body, {headers:headers});
        return this.observables;
    }
}
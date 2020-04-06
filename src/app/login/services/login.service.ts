import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { CpmHttpService } from 'src/app/common/services/cpmHttp.service';
import { LoginModel } from '../models/login';
import { CommonMethods } from 'src/app/common/utilties/commonMethods';
import { LoginServiceUrls } from './loginServiceUrls';

@Injectable()

export class LoginService {

        loginSubject:Subject<any> = new Subject();
        
        constructor(private _cpmHttpService: CpmHttpService){
        }

        validLogin(obj:LoginModel){
            this._cpmHttpService.postDataToService(CommonMethods.formatString(LoginServiceUrls.validLogin, []), obj)
             .subscribe(response=>{
                this.loginSubject.next({result:response, purposre:'validLogin'});  
  
             })
        }
}


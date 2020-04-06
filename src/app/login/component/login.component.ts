import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { LoginModel } from "../models/login";
import { Subscription } from "rxjs";
import { LoginService } from "../services/login.service";
import { Router } from "@angular/router";
import { CommonMethods } from "src/app/common/utilties/commonMethods";
import { LoginMesseges } from "../messeges/loginmesseges";
import { AlertService } from 'src/app/common/services/alert.service';


@Component({
  templateUrl: "../html/login.html"
})
export class LoginComponent {

  loginForm: FormGroup;
  loginObj: LoginModel = new LoginModel();
  subscription: Subscription = new Subscription();

  constructor(
    private _fb: FormBuilder,
    private _logService: LoginService,
    private _router: Router,
    private _notify: AlertService
  ) {
    this.loginForm = _fb.group({
      usernameL: [""],
      passwordL: [""]
    });
  }

  ngAfterViewInit() {
    this.subscription = this._logService.loginSubject.subscribe(res => {
      if (res.result.retCode == "OK") {
        this._notify.success(LoginMesseges.loginSuccessfull);
        this._router.navigate(["/home"]);
      } 
      else this._notify.error(LoginMesseges.loginFailed)
    });
  }

  login() {
    var errMsg = this.validateLogin();
    if (CommonMethods.hasValue(errMsg)) return this._notify.warning(errMsg);
    this.loginObj.UserName = this.loginForm.controls.usernameL.value;
    this.loginObj.Password = this.loginForm.controls.passwordL.value;
    this._logService.validLogin(this.loginObj);
  }

  validateLogin() {
    if (!CommonMethods.hasValue(this.loginForm.controls.usernameL.value)) {
      return LoginMesseges.userName;
    }

    if (!CommonMethods.hasValue(this.loginForm.controls.passwordL.value)) {
      return LoginMesseges.password;
    }
  }


  ngOnDestroy(){
    this.subscription.unsubscribe()
}
}


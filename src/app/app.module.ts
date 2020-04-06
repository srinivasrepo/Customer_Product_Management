import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnvironmentModule } from './environment/environment.module';
import { LoginModule } from './login/component/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CpmHttpService } from './common/services/cpmHttp.service';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from "angular-notifier";
import { AlertService } from './common/services/alert.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EnvironmentModule,
    LoginModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NotifierModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    
  ],
  providers: [CpmHttpService,AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
 
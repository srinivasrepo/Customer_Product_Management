import { NgModule } from "@angular/core";
import { AppMaterialModule } from 'src/app/appMaterial.module';
import { LoginService } from '../services/login.service';
import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
 
   declarations:[LoginComponent],
   imports:[
      AppMaterialModule,  
      FormsModule, 
      CommonModule,
      ReactiveFormsModule,      
   ],
   providers:[LoginService]

})

export class LoginModule{

}
import { NgModule } from "@angular/core";
import { AppMaterialModule } from 'src/app/appMaterial.module';
import { CommonModule } from '@angular/common';
import { CpmGridComponent } from './cpmGrid.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
    declarations:[
                  CpmGridComponent, 

    ],
    imports:[
             AppMaterialModule,
             CommonModule,
             ReactiveFormsModule,
             FormsModule
    ],
    exports:[CpmGridComponent]
})

export class CpmHelpersModule{
    
}
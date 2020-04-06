import { NgModule } from "@angular/core";
import { EnvironmentRoutingModule } from "./environment-routing.module";
import { AppMaterialModule } from '../appMaterial.module';
import { ProductModule } from '../product/component/product.module';
import { CustomerModule } from '../customer/component/customer.module';
import { DialogComponent } from '../cpmHelpers/component/dialog.component';
import { DialogService } from '../cpmHelpers/services/dialog.service';
import { HomeComponent } from '../home/component/home.component';


@NgModule({
  declarations: [HomeComponent,DialogComponent],
  imports: [
    EnvironmentRoutingModule,
    AppMaterialModule,
    ProductModule,
    CustomerModule,

  ],
  providers: [DialogService],
  entryComponents: [DialogComponent]
})

export class EnvironmentModule { }

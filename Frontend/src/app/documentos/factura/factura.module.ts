import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaComponent } from './factura.component';
import { FacturaRoutingModule } from './factura-routing.module';
import { CrudFacturaComponent } from './crud-factura/crud-factura.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUploaderModule } from 'ngx-uploader';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgxUploaderModule,
    FacturaRoutingModule
  ],
  declarations: [FacturaComponent, CrudFacturaComponent]
})
export class FacturaModule { }

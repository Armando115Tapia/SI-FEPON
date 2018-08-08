import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaComponent } from './factura.component';
import { FacturaRoutingModule } from './factura-routing.module';
import { CrudFacturaComponent } from './crud-factura/crud-factura.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    FacturaRoutingModule
  ],
  declarations: [FacturaComponent, CrudFacturaComponent]
})
export class FacturaModule { }

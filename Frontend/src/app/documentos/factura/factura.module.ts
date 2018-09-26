import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaComponent } from './factura.component';
import { FacturaRoutingModule } from './factura-routing.module';
import { CrudFacturaComponent } from './crud-factura/crud-factura.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    TagInputModule,
    FacturaRoutingModule
  ],
  declarations: [FacturaComponent, CrudFacturaComponent]
})
export class FacturaModule { }

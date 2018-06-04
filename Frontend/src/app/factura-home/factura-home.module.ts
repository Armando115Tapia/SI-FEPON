import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FacturaHomeComponent } from './factura-home.component';
import { FacturaHomeRoutingModule } from './factura-home-routing.module';
import { CrudFacturaComponent } from './crud-factura/crud-factura.component';
import { SharedModule } from '../shared/shared.module';
import { InputTextareaModule, CalendarModule, ChipsModule,
          SelectButtonModule, ButtonModule, FileUploadModule, GrowlModule } from 'primeng/primeng';
import { BuscarFacturaComponent } from './buscar-factura/buscar-factura.component';

@NgModule({
  imports: [
    CommonModule,
    FacturaHomeRoutingModule,
    CalendarModule,
    InputTextareaModule,
    SelectButtonModule,
    ButtonModule,
    ChipsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FileUploadModule,
    GrowlModule
  ],
  declarations: [FacturaHomeComponent, CrudFacturaComponent, BuscarFacturaComponent]
})
export class FacturaHomeModule { }

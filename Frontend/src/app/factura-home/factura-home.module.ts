import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FacturaHomeComponent } from './factura-home.component';
import { FacturaHomeRoutingModule } from './factura-home-routing.module';
import { FacturaComponent } from './factura/factura.component';
import { SharedModule } from '../shared/shared.module';
import { InputTextareaModule, CalendarModule, ChipsModule,
          SelectButtonModule, ButtonModule, FileUploadModule} from 'primeng/primeng';


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
    FileUploadModule
  ],
  declarations: [FacturaHomeComponent, FacturaComponent]
})
export class FacturaHomeModule { }

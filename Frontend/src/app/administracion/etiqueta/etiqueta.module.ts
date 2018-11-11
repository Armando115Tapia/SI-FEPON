import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudEtiquetaComponent } from './crud-etiqueta/crud-etiqueta.component';
import { EtiquetaRoutingModule } from '@app/administracion/etiqueta/etiqueta-routing.module';

@NgModule({
  imports: [CommonModule, EtiquetaRoutingModule],
  declarations: [CrudEtiquetaComponent]
})
export class EtiquetaModule {}

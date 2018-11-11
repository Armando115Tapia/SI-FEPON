import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoaderComponent } from './loader/loader.component';
import { CargarArchivosComponent } from './cargar-archivos/cargar-archivos.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, CargarArchivosComponent],
  exports: [LoaderComponent, CargarArchivosComponent, FormsModule]
})
export class SharedModule {}

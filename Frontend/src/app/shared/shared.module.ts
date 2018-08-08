import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { CargarArchivosComponent } from './cargar-archivos/cargar-archivos.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    CargarArchivosComponent
  ],
  exports: [
    LoaderComponent,
    CargarArchivosComponent
  ]
})
export class SharedModule { }

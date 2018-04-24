import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { ClickToEditComponent } from './click-to-edit/click-to-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoaderComponent,
    ClickToEditComponent
  ],
  exports: [
    LoaderComponent,
    ClickToEditComponent
  ]
})
export class SharedModule { }

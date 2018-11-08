import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { CrudEtiquetaComponent } from './crud-etiqueta/crud-etiqueta.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: '',
    children: [
      {
        path: '',
        component: CrudEtiquetaComponent,
        data: { title: extract('Etiqueta') }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EtiquetaRoutingModule { }

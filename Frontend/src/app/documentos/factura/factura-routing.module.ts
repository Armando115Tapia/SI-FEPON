import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { FacturaComponent } from './factura.component';
import { CrudFacturaComponent } from './crud-factura/crud-factura.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: '',
    children: [
      {
        path: 'home',
        component: FacturaComponent,
        data: { title: extract('Factura') }
      },
      {
        path: '',
        component: CrudFacturaComponent,
        data: { title: extract('Factura') }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class FacturaRoutingModule {}

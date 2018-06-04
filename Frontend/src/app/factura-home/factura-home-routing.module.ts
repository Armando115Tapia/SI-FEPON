import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '../core/i18n.service';
import { FacturaHomeComponent } from './factura-home.component';
import { CrudFacturaComponent } from './crud-factura/crud-factura.component';
import { Route } from '../core/route.service';
import { BuscarFacturaComponent } from './buscar-factura/buscar-factura.component';

const routes: Routes = Route.withShell([
  { path: 'factura', component: FacturaHomeComponent, data: { title: extract('Factura') } },
  { path: 'factura/detalle/:id', component: CrudFacturaComponent, data: { title: extract('Factura') } },
  { path: 'factura/ingresar', component: CrudFacturaComponent, data: { title: extract('Factura - Ingresar') } },
  { path: 'factura/buscar', component: BuscarFacturaComponent, data: { title: extract('Factura - Buscar') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class FacturaHomeRoutingModule { }

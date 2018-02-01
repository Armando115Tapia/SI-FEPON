import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '../core/i18n.service';
import { FacturaHomeComponent } from './factura-home.component';
import { FacturaComponent } from './factura/factura.component';
import { Route } from '../core/route.service';

const routes: Routes = Route.withShell([
  { path: 'factura', component: FacturaHomeComponent, data: { title: extract('Factura') } },
  { path: 'factura/ingresar', component: FacturaComponent, data: { title: extract('Factura - Ingresar') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class FacturaHomeRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Route } from '@app/core';

const routes: Routes = [
  Route.withShell([
    { path: 'factura', loadChildren: 'app/documentos/factura/factura.module#FacturaModule' },
    { path: 'etiqueta', loadChildren: 'app/administracion/etiqueta/etiqueta.module#EtiquetaModule' },
    { path: 'about', loadChildren: 'app/about/about.module#AboutModule' }
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  // Error
  // https://github.com/angular/angular/issues/24539
  // imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

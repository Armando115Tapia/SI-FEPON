import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'factura', loadChildren: 'app/documentos/factura/factura.module#FacturaModule' },
    { path: 'etiqueta', loadChildren: 'app/administracion/etiqueta/etiqueta.module#EtiquetaModule' },
    { path: 'about', loadChildren: 'app/about/about.module#AboutModule' }
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}

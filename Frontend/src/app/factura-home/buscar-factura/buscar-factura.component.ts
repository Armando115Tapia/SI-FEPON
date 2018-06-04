import { Component, OnInit } from '@angular/core';
import { BuscarFacturaService } from './servicios/buscar-factura.service';
import { map } from 'rxjs/operators/map';
import { IFactura } from '../../shared/modelos';
import { Router } from '@angular/router';
import Query from 'waterline-query-language-parser';

@Component({
  selector: 'app-buscar-factura',
  templateUrl: './buscar-factura.component.html',
  styleUrls: ['./buscar-factura.component.scss'],
  providers: [BuscarFacturaService]
})
export class BuscarFacturaComponent implements OnInit {

  criterioBusqueda: string;
  facturas: IFactura[];
  isFacturasEsVacio: boolean;
  parser: Query;
  constructor
  (
    private buscarFacturaServicios: BuscarFacturaService,
    private router: Router
  ) {
    this.criterioBusqueda = '';
    this.facturas = [];
    this.isFacturasEsVacio = false;
   }

  ngOnInit() {
  }

  buscarFactura() {

    this.parser = new Query(this.criterioBusqueda);
    console.log(this.parser.query);
    this.buscarFacturaServicios.buscarFactura(this.parser.query)
      .pipe(map(res => res.json()))
      .subscribe(
        (data: IFactura[]) => {
          this.facturas = data;

          if (this.facturas.length === 0) {
            this.isFacturasEsVacio = true;
          } else {
            this.isFacturasEsVacio = false;
          }

        },
        error => {
          console.log(error);
        }
      );
  }

  navegarDetalleFactura(idFactura: string) {
    this.router.navigate(['factura/detalle/' + idFactura]);
  }

}

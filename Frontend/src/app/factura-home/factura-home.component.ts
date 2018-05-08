import { Component, OnInit } from '@angular/core';
import { FacturaHomeService } from './servicios/factura-home.service';
import { map } from 'rxjs/operators/map';
import { IFactura } from './../shared/modelos/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-factura',
  templateUrl: './factura-home.component.html',
  styleUrls: ['./factura-home.component.scss'],
  providers: [FacturaHomeService]
})
export class FacturaHomeComponent implements OnInit {

  facturas: IFactura[];
  constructor(
    private facturaHomeService: FacturaHomeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.facturaHomeService.descargarUltimasFacturas()
      .pipe(map(res => res.json()))
      .subscribe(
        data => {
          this.facturas = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  /**
   * Navega a la pagina de detalle factura
   *
   * @param {string} idFactura id de factura a ver detalles
   * @memberof FacturaHomeComponent
   */
  cargarDetalleFactura(idFactura: string) {
    this.router.navigate(['/factura/' + idFactura]);
  }

}

import { Component, OnInit } from '@angular/core';
import { FacturaHomeService } from './servicios/factura-home.service';
import { map } from 'rxjs/operators/map';
import { IFactura } from './../shared/modelos/index';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-factura',
  templateUrl: './factura-home.component.html',
  styleUrls: ['./factura-home.component.scss'],
  providers: [FacturaHomeService]
})
export class FacturaHomeComponent implements OnInit {

  facturas: IFactura[];
  urlImagenFactura: string;

  constructor(
    private facturaHomeService: FacturaHomeService,
    private router: Router
  ) {
    this.urlImagenFactura = environment.serverUrl;
  }

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

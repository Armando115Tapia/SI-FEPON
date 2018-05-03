import { Component, OnInit } from '@angular/core';
import { FacturaHomeService } from './servicios/factura-home.service';
import { map } from 'rxjs/operators/map';
import { IFactura } from './../shared/modelos/index';

@Component({
  selector: 'app-factura',
  templateUrl: './factura-home.component.html',
  styleUrls: ['./factura-home.component.scss'],
  providers: [FacturaHomeService]
})
export class FacturaHomeComponent implements OnInit {

  facturas: IFactura[];
  constructor(private facturaHomeService: FacturaHomeService) { }

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

}

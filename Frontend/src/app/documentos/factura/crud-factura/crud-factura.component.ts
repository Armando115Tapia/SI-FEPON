import { Component, OnInit } from '@angular/core';
import { Factura } from '@app/core/models/factura.model';
import { getIFacturaMock } from '@app/core/models/factura.mock';

@Component({
  selector: 'app-crud-factura',
  templateUrl: './crud-factura.component.html',
  styleUrls: ['./crud-factura.component.scss']
})
export class CrudFacturaComponent implements OnInit {
  factura: Factura;

  constructor() {
    this.factura = new Factura(getIFacturaMock());
  }

  ngOnInit() {}

  agregarRubroASubtotalDetalle() {
    this.factura.detalle.push({ cantidad: 0, descripcion: '', precioUnitario: 0, total: 0 });
  }

  eliminarRubroASubtotalDetalle(indiceRubro: number) {
    this.factura.detalle.splice(indiceRubro, 1);
  }

  agregarRubroASubtotalDetalleTotal() {
    this.factura.detalleTotal.push({ cantidad: 0, nombre: '' });
  }

  eliminarRubroASubtotalDetalleTotal(indiceRubro: number) {
    this.factura.detalleTotal.splice(indiceRubro, 1);
  }
}

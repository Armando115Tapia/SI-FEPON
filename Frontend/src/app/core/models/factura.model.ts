import { IDetalleFactura } from './detalle-factura.model';
import { IImagenFactura } from './imagen-factura';
import { Etiqueta } from './etiqueta.model';
import { IDetalleTotal } from './detalle-total.model';

export class Factura {
  id?: string;
  nombreEmisor: string;
  rucEmisor: string;
  numeroFactura: string;
  fecha: Date;
  nombreReceptor: string;
  rucReceptor: string;
  detalle: IDetalleFactura[];
  detalleTotal: IDetalleTotal[];
  comentario: string;
  total: number;
  isIngreso: boolean;
  etiquetas: Etiqueta[];
  imagen: IImagenFactura;
  isIva: boolean;
  iva: number;

  constructor(
    nombreEmisor: string,
    rucEmisor: string,
    numeroFactura: string,
    fecha: Date,
    nombreReceptor: string,
    rucReceptor: string,
    detalle: IDetalleFactura[],
    detalleTotal: IDetalleTotal[],
    comentario: string,
    total: number,
    isIngreso: boolean,
    etiquetas: Etiqueta[],
    imagen: IImagenFactura,
    isIva: boolean,
    iva: number,
    id?: string
  ) {
    this.id = id;
    this.nombreEmisor = nombreEmisor;
    this.rucEmisor = rucEmisor;
    this.numeroFactura = numeroFactura;
    this.fecha = fecha;
    this.nombreReceptor = nombreReceptor;
    this.rucReceptor = rucReceptor;
    this.detalle = detalle;
    this.detalleTotal = detalleTotal;
    this.comentario = comentario;
    this.total = total;
    this.isIngreso = isIngreso;
    this.etiquetas = etiquetas;
    this.imagen = imagen;
    this.isIva = isIva;
    this.iva = iva;

    this.calculoTotal();
  }

  /**
   * Calcula el subtotal de la factura a través del
   * el detalle de la factura
   *
   * @returns {number} el total de la factura
   * @memberof Factura
   */
  calcularSubTotal(): number {
    let subTotal = 0;
    for (const detalle of this.detalle) {
      subTotal += detalle.cantidad * detalle.precioUnitario;
    }
    return subTotal;
  }

  calculoDetalleTotal(): number {
    let total = 0;
    for (const detalleTotal of this.detalleTotal) {
      if (detalleTotal.isSuma) {
        total += detalleTotal.cantidad;
      } else {
        total -= detalleTotal.cantidad;
      }
    }
    return total;
  }

  calculoTotal() {
    let total = 0;
    if (this.isIva) {
      total = (this.calcularSubTotal() * this.iva) / 100 + this.calculoDetalleTotal() + this.calcularSubTotal();
    } else {
      total = this.calcularSubTotal() + this.calculoDetalleTotal();
    }
    this.total = total;
  }
}

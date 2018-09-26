import { IDetalleFactura } from './detalle-factura.model';
import { IImagenFactura } from './imagen-factura';
import { IEtiqueta } from './etiqueta.interface';
import { IDetalleTotal } from './detalle-total.model';

export interface IFactura {
  id?: string;
  nombreEmisor: string;
  rucEmisor: string;
  numeroFactura: string;
  fecha: Date;
  nombreReceptor: string;
  rucReceptor: string;
  detalle: IDetalleFactura[];
  subTotalDetalle: number;
  detalleTotal: IDetalleTotal[];
  subTotalDetalleTotal: number;
  comentario: string;
  total: number;
  isIngreso: boolean;
  etiquetas: IEtiqueta[];
  imagenes: IImagenFactura[];
  isIva: boolean;
  valorIva: number;
  iva: number;
}

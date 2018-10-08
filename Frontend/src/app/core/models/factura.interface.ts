import { IDetalleFactura } from './detalle-factura.model';
import { IImagenFactura } from './imagen-factura';
import { IEtiqueta } from './etiqueta.interface';
import { IDetalleTotal } from './detalle-total.model';

interface IBaseFactura {
  id?: string;
  nombreEmisor: string;
  rucEmisor: string;
  numeroFactura: string;
  nombreReceptor: string;
  rucReceptor: string;
  detalle: IDetalleFactura[];
  subTotalDetalle: number;
  detalleTotal: IDetalleTotal[];
  subTotalDetalleTotal: number;
  comentario: string;
  total: number;
  isIngreso: boolean;
  imagenes: IImagenFactura[];
  isIva: boolean;
  valorIva: number;
  iva: number;
}

export interface IFactura extends IBaseFactura {
  fecha: { year: number; month: number; day: number };
  etiquetas: IEtiqueta[];
}

export interface IFacturaDatabase extends IBaseFactura {
  fecha: Date;
  etiquetas: string[];
}

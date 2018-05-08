import { IDetalleFactura } from './detalle-factura';
import { IImagenFactura } from './imagen-factura';

export interface IFactura {
  id?: number;
  descripcion: string;
  fecha: Date;
  total: number;
  tipo: string;
  detalle: IDetalleFactura[];
  etiquetas: any;
  imagen: IImagenFactura;
}

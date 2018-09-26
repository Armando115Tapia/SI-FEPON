import { IFactura } from '@app/core/models/factura.interface';

export interface IEtiqueta {
  id?: string;
  nombre: string;
  categoria: string;
  facturas?: IFactura[];
}

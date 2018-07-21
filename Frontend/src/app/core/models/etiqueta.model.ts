import { Factura } from './factura.model';

export class Etiqueta {
  id: string;
  nombre: string;
  categoria: string;
  factura: number | Factura;

  constructor(nombre: string, id?: string, categoria?: string, factura?: number | Factura) {}
}

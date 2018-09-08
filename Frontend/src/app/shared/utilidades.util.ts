export enum TipoImagen {
  facturas = 'facturas',
  notasVentas = 'notasVenta'
}

export interface IModeloArchivo {
  nombreArchivoOriginal: string;
  nombreArchivo: string;
  ubicacion: string;
}

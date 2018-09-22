export enum TipoImagen {
  facturas = 'facturas',
  notasVentas = 'notasVenta'
}

export interface IModeloArchivo {
  nombreArchivoOriginal: string;
  nombreArchivo: string;
  ubicacion: string;
}

export interface IModeloArchivoCompleto extends IModeloArchivo {
  /**
   * url para peticion de imagen al servidor
   *
   * @type {string}
   * @memberof IModeloArchivo
   */
  url?: string;
}

import { IFactura } from './factura.interface';

const getDefaults = (): IFactura =>
  <IFactura>{
    id: null,
    nombreEmisor: '',
    rucEmisor: '',
    numeroFactura: '',
    fecha: null,
    nombreReceptor: '',
    rucReceptor: '',
    detalle: [],
    subTotalDetalle: 0,
    detalleTotal: [],
    subTotalDetalleTotal: 0,
    comentario: '',
    total: 0,
    isIngreso: false,
    etiquetas: [],
    imagenes: [],
    isIva: true,
    iva: 12,
    valorIva: 0
  };

const getIFacturaMock = (p?: Partial<IFactura>): IFactura => {
  return <IFactura>{
    ...getDefaults(),
    ...p
  };
};

export { getIFacturaMock };

import { Factura } from './factura.model';
import { getIFacturaMock } from './factura.mock';
import { getIEtiquetaMock } from './etiqueta.mock';

const factura = new Factura(
  getIFacturaMock({
    nombreEmisor: 'Juan Perez',
    rucEmisor: '123456789',
    numeroFactura: '1215418452',
    fecha: { year: 2018, month: 2, day: 15 },
    nombreReceptor: 'FEPON',
    rucReceptor: '1215247621001',
    detalle: [
      { cantidad: 10, descripcion: 'lapiz', precioUnitario: 50, total: 0 },
      { cantidad: 5, descripcion: 'papel', precioUnitario: 10, total: 0 }
    ],
    detalleTotal: [{ nombre: 'descuento', cantidad: -100 }],
    comentario: 'Ya mismo da sueño',
    total: 400,
    isIngreso: false,
    etiquetas: [getIEtiquetaMock({ nombre: 'senescyt', id: '5555', categoria: 'cursos' })],
    imagenes: [{ nombreArchivo: 'file:///home/img/img.png', nombreArchivoOriginal: 'factura', ubicacion: '/home/img' }],
    isIva: true,
    iva: 12,
    valorIva: 0
  })
);

describe('Calculo del total de la factura', () => {
  it('deberia calcular el total de la factura', () => {
    expect(516).toEqual(factura.total);
  });
});

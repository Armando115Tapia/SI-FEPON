import { Factura } from './factura.model';

const factura = new Factura(
  'Juan Perez',
  '1215247621001',
  '123456789',
  new Date(),
   'FEPON',
 '1215418452',
  [{'cantidad': 10, 'descripcion': 'lapiz', precioUnitario: 50},
  {'cantidad': 5, 'descripcion': 'papel', precioUnitario: 10}],
  [{nombre: 'descuento', cantidad: 100, isSuma: false}],
  'Ya mismo da sueño',
  400,
  false,
  [{'nombre': 'senescyt', 'id': '5555', 'categoria': 'cursos', 'factura': 1}],
  {'nombreArchivo': 'file:///home/img/img.png', nombreArchivoOriginal: 'factura', ubicacion: '/home/img'},
  true,
  12
);

describe('Calculo del total de la factura', () => {
  it('deberia calcular el total de la factura', () => {
    expect(450).toEqual(factura.total);
  });
});

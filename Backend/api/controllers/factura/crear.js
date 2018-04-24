/**
 * Crear factura
 *
 * @description :: Accion para la creación de una factura
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  friendlyName: 'Crear factura',
  description: 'Crear una nueva factura',
  extendedDescription: 'Esta accion crea una nueva factura',
  inputs: {
    descripcion: {
      type: 'string',
      required: true,
      example: 'Factura de compra de vasos',
      description: 'descripcion',
      whereToGet: {
        description: 'Compra de factura'
      }
    },
    fecha: {
      type: 'string',
      required: true,
      example: '01/04/1992',
      description: 'fecha',
      whereToGet: {
        description: 'Fecha de factura'
      }
    },
    total: {
      type: 'number',
      required: true,
      example: 1.0,
      description: 'Total factura',
      whereToGet: {
        description: 'Factura'
      }
    },
    tipo: {
      type: 'string',
      required: true,
      example: "ingresos",
      description: 'Tipo de factura',
      whereToGet: {
        description: 'Factura'
      }
    },
    imagen: {
      type: 'json',
      description: 'Imagen de la factura',
      whereToGet: {
        description: 'Escanner de factura'
      }
    },
    detalleFacturas: {
      type: 'json',
      required: true,
      description: 'Detalle de las facturas',
      whereToGet: {
        description: 'Factura'
      }
    },
    etiquetas: {
      type: 'json',
      required: true,
      description: 'Etiquetas que tiene la factura',
      whereToGet: {
        description: 'Factura'
      }
    },

  },
  exits: {
    exitoCreacion: {
      description: 'Se ha creado con exito el modelo',
      responseType: 'exitoCreacion'
    },
    errorCreacion: {
      description: 'Error creacion de modelo',
      responseType: 'errorCreacion'
    }
  },

  fn: async function(inputs, exits) {

    let modeloFactura = {
      'descripcion': inputs.descripcion,
      'fecha': inputs.fecha,
      'total': inputs.total,
      'tipo': inputs.tipo
    };

    let facturaCreada = await Factura.create(modeloFactura).fetch();

    if (!facturaCreada) {
      sails.log.error('Factura no creada');
      return exits.errorCreacion('Factura');
    }

    sails.log.verbose('Factura creada');

    // Agrego etiquetas a la factura
    async.each(inputs.etiquetas, async (nombreEtiqueta, cb) => {

      let etiquetaCreadaEncontrada = await Etiqueta.findOrCreate({'nombre': nombreEtiqueta}, {'nombre': nombreEtiqueta});

      if (etiquetaCreadaEncontrada) {
        await Factura.addToCollection(facturaCreada.id, 'etiquetas').members(etiquetaCreadaEncontrada.id);
        cb();
      } else {
        sails.log.error('Etiquetada no encontrada ni creada');
        cb('Etiqueta no encontrada ni creada');
      }
    },
    (error) => {
      if (error) {
        sails.log.error('Error creando etiquetas')
      }

      async.each(inputs.detalleFacturas, async (detalleFactura, cb) => {
        let detalleFacturaCreado = await DetalleFactura.create(detalleFactura).fetch();

        if (detalleFacturaCreado) {
          await Factura.addToCollection(facturaCreada.id, 'detalleFacturas').members(detalleFacturaCreado.id);
          cb();
        } else {
          sails.log.error('DetalleFactura no creada');
          cb('DetalleFactura no creada');
        }

      },
      (error) => {
        if (error) {
          sails.log.error('Error creando detalle factura');
        }
        return this.res.exitoCreacion('Factura', facturaCreada);
      }) // fin each detallefacturas
    }) // fin each etiquetas
  }

};


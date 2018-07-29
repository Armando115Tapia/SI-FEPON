/**
 * Factura.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    // cabecera de la factura
    nombreEmisor: {
      type: 'string',
      required: true
    },
    rucEmisor: {
      type: 'string',
      required: true
    },
    numeroFactura: {
      type: 'string',
      required: true
    },
    fecha: {
      type: 'string',
      required: true
    },
    nombreReceptor: {
      type: 'string',
      required: true
    },
    rucReceptor: {
      type: 'string'
    },

    // detalle
    detalle: {
      type: 'json'
    },

    comentario: {
      type: 'string',
    },

    // estadisticas
    detalleTotal: {
      type: 'json'
    },
    total: {
      type: 'number',
      required: true
    },
    isIva:{
      type:'boolean',
      required:true
    },
    iva: {
      type: 'number'
    },
    isIngreso: {
      type: 'boolean',
      required: true
    },
    etiquetas: {
      collection: 'Etiqueta',
      via: 'facturas'
    },
    imagen: {
      type: 'json'
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
  }
};

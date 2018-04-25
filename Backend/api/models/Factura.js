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
    descripcion: {
      type: 'string',
      required: true
    },
    fecha: {
      type: 'string',
      columnType: 'date',
      required: true
    },
    total: {
      type: 'number',
      required: true
    },
    tipo: {
      type: 'string',
      required: true
    },
    detalle: {
      type: 'json'
    },
    // cantidad: {
    //   type: 'number',
    //   required: true
    // },
    // descripcion: {
    //   type: 'string',
    //   required: true
    // },
    // precioUnitario: {
    //   type: 'number',
    //   required: true
    // },
    etiquetas: {
      type: 'json'
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
  },

};


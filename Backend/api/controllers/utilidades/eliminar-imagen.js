/**
 * Eliminar archivo
 *
 * @description :: Accion para eliminar archivo
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let fs = require('fs');

module.exports = {
  friendlyName: 'Eliminar un archivo',
  description: 'Eliminar de archivo',
  inputs: {
    nombre: {
      type: 'string',
      required: true
    },
    tipo: {
      // facturas, notas-venta
      type: 'string',
      required: true
    }
  },
  exits: {
    exitoGenerico: {
      description: 'Se ha eliminado con exito el modelo',
      responseType: 'exitoGenerico'
    },
    errorGenerico: {
      description: 'Ocurrio un error',
      responseType: 'errorGenerico'
    }
  },

  fn: async function(inputs, exits) {
    sails.log.info(
      `${sails.config.appPath}/assets/images/${inputs.tipo}/${inputs.nombre}`
    );
    fs.unlink(
      `${sails.config.appPath}/assets/images/${inputs.tipo}/${inputs.nombre}`,
      error => {
        if (error) {
          sails.log.error('Error eliminando archivo fisicamente');
          return exits.error({ mensaje: 'Archivo no ha sido eliminado' });
        } else {
          sails.log.info('Archivo eliminado fisicamente');
          return exits.success({ mensaje: 'Archivo ha sido eliminado' });
        }
      }
    );
  }
};

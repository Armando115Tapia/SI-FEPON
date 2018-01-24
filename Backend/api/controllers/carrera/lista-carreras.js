/**
 * Descargar lista de carreras
 *
 * @description :: Accion para descargar la lista de carreras
 * @help        :: See https://sailsjs.comdocs/concepts/actions
 */

module.exports = {

  friendlyName: 'Lista de carreras',
  description: 'Descargar lista de carreras',
  exits: {
    exitoDatos: {
      description: 'Se obtenido la información con exito',
      responseType: 'exitoDatos'
    },
    errorGenerico: {
      description: 'Error no se ha podido obtener la información',
      responseType: 'errorGenerico'
    }
  },

  fn: async function(inputs, exits) {

    // TODO: ordenar find en orden alfabetico
    let listaCarreras = await Carrera.find();

    if (listaCarreras.length === 0) {
      return exits.errorGenerico('No se ha encontrado carreras');
    }

    return this.res.exitoDatos('Carreras', listaCarreras);

  }
};


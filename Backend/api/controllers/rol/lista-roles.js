/**
 * Descargar lista de roles
 *
 * @description :: Accion para descargar la lista de roles
 * @help        :: See https://sailsjs.comdocs/concepts/actions
 */

module.exports = {

  friendlyName: 'Lista de roles',
  description: 'Descargar lista de roles',
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

    let listaRoles = await Rol.find();

    if (listaRoles.length === 0) {
      return exits.errorGenerico('No se ha encontrado roles');
    }

    return this.res.exitoDatos('Usuario', listaRoles);

  }
};


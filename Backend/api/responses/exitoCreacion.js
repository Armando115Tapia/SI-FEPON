/**
 *
 * Respuesta de exito ante la creacion de exito de un objeto
 *
 * @param {*} nombreModelo Contiene el nombre del modelo a ser utilizado
 * @param {*} modeloCreado Contiene el modelo que fue creado
 */

module.exports = function exitoCreacion(nombreModelo, modeloCreado) {

  var req = this.req;
  var res = this.res;

  sails.log.verbose('Ejecutando respuesta: res.exitoCreacion()');

  if (req.wantsJSON) {

    let respuestaJSON = {
      'mensaje': nombreModelo +' creado con exito',
      'respuesta': modeloCreado
    }

    return res.status(200).json(respuestaJSON)

  } else {
    sails.log.error('Peticion no pide respuesta JSON');
    res.serverError('Peticion no pide respuesta JSON');
  }
};

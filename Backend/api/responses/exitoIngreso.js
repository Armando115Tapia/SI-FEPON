/**
 *
 * Respuesta de exito ante el ingreso de exito al sistema
 *
 * @param {*} token Contiene el token de acceso al sistema
 *
 */

module.exports = function exitoIngreso(token) {

  var req = this.req;
  var res = this.res;

  sails.log.verbose('Ejecutando respuesta: res.exitoIngreso()');

  if (req.wantsJSON) {

    let respuestaJSON = {
      'mensaje': 'Autenticación con exito',
      'respuesta': token
    }

    return res.status(200).json(respuestaJSON)

  } else {
    sails.log.error('Peticion no pide respuesta JSON');
    res.serverError('Peticion no pide respuesta JSON');
  }
};

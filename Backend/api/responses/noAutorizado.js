/**
 *
 * Respuesta de no autoriza ante la una autenticacion
 *
 * @param {*} mensaje Contiene el mensaje a ser enviado al cliente
 *
 */

module.exports = function noAutorizado(mensaje) {

  var req = this.req;
  var res = this.res;

  sails.log.verbose('Respuesta: No autorizado');

  if (req.wantsJSON) {

    let respuestaJSON = {
      'mensaje': mensaje,
    };

    return res.status(401).json(respuestaJSON);

  } else {
    sails.log.error('Peticion no pide respuesta JSON');
    res.serverError('Peticion no pide respuesta JSON');
  }
};

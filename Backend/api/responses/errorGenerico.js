/**
 *
 * Respuesta de error ante la un error generico
 *
 * @param {*} mensaje Contiene el mensaje a ser enviado al cliente
 *
 */

module.exports = function errorGenerico(mensaje) {

  var req = this.req;
  var res = this.res;

  sails.log.verbose('Ejecutando respuesta: res.errorGenerico()');

  if (req.wantsJSON) {

    let respuestaJSON = {
      'mensaje': mensaje,
    }

    return res.status(500).json(respuestaJSON);

  } else {
    sails.log.error('Peticion no pide respuesta JSON');
    res.serverError('Peticion no pide respuesta JSON');
  }
};

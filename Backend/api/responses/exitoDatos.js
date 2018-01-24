/**
 *
 * Respuesta de exito ante la obtención de datos
 *
 * @param {*} mensaje Contiene el mensaje a ser enviado al cliente
 * @param {*} registros Contiene los registros obtenidos a ser enviados
 */

module.exports = function errorGenerico(mensaje, registros) {

  var req = this.req;
  var res = this.res;

  sails.log.verbose('Ejecutando respuesta: res.exitoDatos()');

  if (req.wantsJSON) {

    let respuestaJSON = {
      'mensaje': mensaje,
      'registros': registros
    }

    return res.status(200).json(respuestaJSON);

  } else {
    sails.log.error('Peticion no pide respuesta JSON');
    res.serverError('Peticion no pide respuesta JSON');
  }
};

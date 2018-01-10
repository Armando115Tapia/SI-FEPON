/**
 *
 * Respuesta de error ante la creacion de un objeto
 *
 * @param {*} nombreModelo Contiene el nombre del modelo a ser utilizado
 *
 */

module.exports = function errorCreacion(nombreModelo) {

  var req = this.req;
  var res = this.res;

  sails.log.verbose('Ejecutando respuesta: res.errorCreacion()');

  if (req.wantsJSON) {

    var error = new Error('Error creando '+ nombreModelo);

    let respuestaJSON = {
      'mensaje': 'Error creando '+ nombreModelo,
    }
    console.log(nombreModelo);
    return res.status(500).json(respuestaJSON);

  } else {
    sails.log.error('Peticion no pide respuesta JSON');
    res.serverError('Peticion no pide respuesta JSON');
  }
};

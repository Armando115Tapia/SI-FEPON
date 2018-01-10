/**
 * isAutorizado
 *
 * @description :: Politica que verifica si un usario esta autorizado con JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 *              :: Fuente https://gist.github.com/vunb/8b6ce5e3da3156adacd64829383e409e#file-isauthorized-js
 */

module.exports = function (req, res, next) {

  let parametros = req.allParams();
  let token;

  if (req.headers && req.headers.authorization) {
    let parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      let scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.status(401).json({mensaje: 'El formato es Authorization: Bearer [token]'});
    }
  } else if (parametros.token) {
    token = parametros.token;
    delete req.query.token;
  } else {
    return res.status(401).json({mensaje: 'No se encontro la cabecera Authorization'});
  }

  // Este el token descifrado o el payload proporcionado
  console.log(sails);
  req.token =  sails.helpers.verificarjwt(token);
  if (req.token) {
    next();
  }

};

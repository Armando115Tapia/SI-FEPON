/**
 *  Helper para generar un token segun un payload
 */
var jwt = require('jsonwebtoken')
var tokenSecret = 'token'

module.exports = {

  friendlyName: 'Generador token',
  description: 'Generador de token según usuario (payload)',
  sync: false,
  inputs: {
    usuario: {
      type: 'json',
      description: 'Modelo usuario',
      required: true
    }
  },

  fn: function (inputs, exits) {
    return exits.success(jwt.sign(inputs.usuario, tokenSecret, {expiresIn: "1 day"}));
  }

};

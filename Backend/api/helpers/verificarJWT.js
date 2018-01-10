/**
 *  Helper para verificar un token segun un payload
 */
var jwt = require('jsonwebtoken')
var tokenSecret = 'token'

module.exports = {

  friendlyName: 'Verificador de tokens',
  description: 'Verificador de tokens según token ingresado (payload)',
  sync: false,
  inputs: {
    token: {
      type: 'string',
      description: 'JSON web token',
      required: true
    }
  },

  fn: function (inputs, exits) {
    return exits.sucess(jwt.verify(inputs.token, tokenSecret));
  }

};

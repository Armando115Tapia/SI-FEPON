/**
 *  Helper para verificar password cifrado
 */
var Passwords = require('machinepack-passwords');

module.exports = {

  friendlyName: 'Verificado de password cifrado',
  description: 'Verificado de password cifrado con el algoritmo BCrypt',
  sync: false,
  inputs: {
    password: {
      type: 'string',
      description: 'Password',
      required: true
    },
    passwordCifrado: {
      type: 'string',
      description: 'Password cifrado',
      required: true
    }
  },

  fn: function (inputs, exits) {
    Passwords.checkPassword(
      {passwordAttempt: inputs.password,
      encryptedPassword: inputs.passwordCifrado})
             .exec({
                    error: function (err) {
                      sails.log.error('Error verificando password cifrado');
                      console.log('Error')
                      return exits.error(err);
                    },
                    incorrect: function () {
                      return exits.success(false);
                    },
                    success: function () {
                      return exits.success(true);
                    },
                  });
  }
};

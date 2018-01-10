/**
 *  Helper para cifrar un password
 */
var Passwords = require('machinepack-passwords');

module.exports = {

  friendlyName: 'Cifrador de password',
  description: 'Cifrar un password con el algoritmo BCrypt',
  sync: false,
  inputs: {
    password: {
      type: 'string',
      description: 'Password',
      required: true
    }
  },

  fn: function (inputs, exits) {
    Passwords.encryptPassword({password: inputs.password})
             .exec({
                    error: function (err) {
                      sails.log.error('Error cifrando password');
                      return exits.error(err);
                    },
                    success: function (result) {
                      sails.log.verbose('Password cifrado');
                      return exits.success(result);
                    },
                  });
  }
};

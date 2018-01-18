/**
 * Ingresar con cuenta de usuario
 *
 * @description :: Accion para la ingresar con la cuenta de usuario
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  friendlyName: 'Ingresar cuenta usuario',
  description: 'Ingresar al sistema',
  extendedDescription: 'Esta accion autentica si el usuario se encuentra en el sistema',
  inputs: {
    rol: {
      type: 'string',
      required: true,
      example: 'Estudiante',
      description: 'Rol de usuario',
      extendedDescription: 'Rol por defecto es estudiante',
      whereToGet: {
        description: 'Carnet otorgado por la FEPON'
      }
    },
    email: {
      type: 'string',
      required: true,
      example: 'luis.reinoso@epn.edu.ec',
      description: 'Corre electronico del usuario',
      extendedDescription: 'Correo electronico de la cuenta del usuario',
      whereToGet: {
        description: 'Cualquier proveedor de correo electronico'
      }
    },
    password: {
      type: 'string',
      required: true,
      example: '123456789',
      description: 'Contrasenia del usuario',
      extendedDescription: 'Contrasenia de la cuenta del usuario'
    }
  },
  exits: {
    exitoIngreso: {
      description: 'Se ha autenticado con exito',
      responseType: 'exitoIngreso'
    },
    errorIngreso: {
      description: 'Error en autenticacion',
      responseType: 'errorGenerico'
    }
  },

  fn: async function(inputs, exits) {

    let usuarioEncontrado = await Usuario.findOne({
      'rol': inputs.rol,
      'email':inputs.email
    });

    if (!usuarioEncontrado) {
      return exits.errorIngreso('Error rol, email, password no coincide');
    }

    let isPasswordCorrecto = await sails.helpers.verificarpassword(inputs.password, usuarioEncontrado.password);

    if (!isPasswordCorrecto) {
      return exits.errorIngreso('Error rol, email, password no coincide');
    }

    let token = await sails.helpers.generarjwt(usuarioEncontrado);
    delete usuarioEncontrado.password;
    return exits.exitoIngreso({'token': token, 'usuario': usuarioEncontrado});

  }
};


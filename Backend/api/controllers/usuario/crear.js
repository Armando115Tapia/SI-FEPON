/**
 * Crear usuario
 *
 * @description :: Accion para la creación de usuario
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  friendlyName: 'Crear usuario',
  description: 'Crear un nuevo usuario',
  extendedDescription: 'Esta accion crea un nuevo usuario',
  inputs: {
    nombre: {
      type: 'string',
      required: true,
      example: 'Luis Reinoso',
      description: 'Nombre',
      extendedDescription: 'Nombre completo',
      whereToGet: {
        description: 'Cédula de identidad'
      }
    },
    genero: {
      type: 'string',
      required: true,
      example: 'Masculino',
      description: 'Género',
      whereToGet: {
        description: 'Cédula de identidad'
      }
    },
    rol: {
      type: 'number',
      required: true,
      example: '1',
      description: 'Rol de usuario',
      extendedDescription: 'Rol por defecto es estudiante',
      whereToGet: {
        description: 'Carnet otorgado por la FEPON'
      }
    },
    carrera: {
      type: 'number',
      example: '1',
      description: 'Carrera de usuario',
      extendedDescription: 'Carrera es opcional',
      whereToGet: {
        description: 'Carnet otorgado por la FEPON'
      }
    },
    numeroUnico: {
      type: 'string',
      example: '201212345',
      description: 'Número único',
      extendedDescription: 'Número único otorgado por la universidad',
      whereToGet: {
        description: 'Carnet otorgado por la FEPON o EPN'
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
    exitoCreacion: {
      description: 'Se ha creado con exito el modelo',
      responseType: 'exitoCreacion'
    },
    errorCreacion: {
      description: 'Error en creacion de modelo',
      responseType: 'errorCreacion'
    },
    errorEmailEnUso: {
      description: 'Error correo en uso',
      responseType: 'errorGenerico'
    }
  },

  fn: async function(inputs, exits) {

    let modeloUsuario = {
      'nombre': inputs.nombre,
      'genero': inputs.genero,
      'rol': inputs.rol,
      'carrera': inputs.carrera,
      'numeroUnico': inputs.numeroUnico,
      'email': inputs.email,
      'password': await sails.helpers.cifrarpassword(inputs.password)
    }

    // TODO: Obtener mensaje para cada caso por separado
    let usuarioCreado = await Usuario.create(modeloUsuario)
      .intercept('E_UNIQUE', ()=> {
        sails.log.warn('Correo electronico o Número único en uso');
        return exits.errorEmailEnUso('Correo electronico o Número único en uso');
        })
      .fetch();

    if (!usuarioCreado) {
      sails.log.error('Usuario no creado');
      return exits.errorCreacion('Usuario');
    }

    sails.log.verbose('Usuario creado');
    let token = await sails.helpers.generarjwt(usuarioCreado);
    delete usuarioCreado.password; //eliminar passsword del modelo
    let respuesta = {
      'usuario': usuarioCreado,
      'token': token
    }

    //uso de this.res para que acepte mas de dos parametros
    return this.res.exitoCreacion('Usuario', respuesta);
  }

};


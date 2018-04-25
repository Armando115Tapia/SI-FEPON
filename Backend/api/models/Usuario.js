/**
 * Usuario.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    nombre: {
      type: 'string',
      required: true
    },
    genero: {
      type: 'string',
      isIn: ['Masculino', 'Femenino', 'Otro'],
      required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      example: 'luis.reinoso@epn.edu.ec'
    },
    password: {
      type: 'string',
      required: true,
      example: '$2a$10$PnfKM2ygKazY9tuVtOECEuGvNjr0DtUPkYv34qkKTygVsKF/PVHkm'
    },
    numeroUnico: {
      type: 'string',
      unique: true,
    },
    numeroTelefono: {
      type: 'string',
      required: true
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    rol: {
      type: 'string',
      required: true
    },
    carrera: {
      type: 'string',
      required: true
    },
    facultad: {
      type: 'string',
      required: true
    }
  },

};


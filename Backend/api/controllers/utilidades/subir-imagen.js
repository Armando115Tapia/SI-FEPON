/**W
 * Subir
 *
 * @description :: Accion para la ingresar con la cuenta de usuario
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  friendlyName: 'Subir imagenes',
  description: 'Subir imagen de factura',
  inputs: {},
  exits: {
    exitoIngreso: {
      description: 'Imágen subida con exito',
      responseType: 'exitoIngreso'
    },
    noAutorizado: {
      description: 'No se subio la imágen',
      responseType: 'noAutorizado'
    }
  },

  fn: async function(inputs, exits) {
    this.req.file('imagen').upload(
      {
        dirname: require('path').resolve(
          sails.config.appPath,
          'assets/images/facturas'
        )
      },
      (error, imagenSubida) => {
        if (error) {
          return this.res.status(400).json({ error: 'Error subiendo imagen' });
        }

        if (imagenSubida) {
          sails.log.info('Imagen subida',imagenSubida);
          // Obtener nombre de archivo
          let tokenNombreArchivo = imagenSubida[0].fd.split('/');
          let nombreArchivo = tokenNombreArchivo[tokenNombreArchivo.length - 1];

          let archivo = {
            nombreArchivoOriginal: imagenSubida[0].filename,
            nombreArchivo: nombreArchivo,
            ubicacion: imagenSubida[0].fd,
          };

          sails.log.info('Registro imagen añadido');
          return this.res.status(200).json({
            mensaje: 'Imagen almacenada correctamente',
            imagen: archivo
          });
        }
      }
    );
  }
};


/**
 * Subir imagen
 *
 * @description :: Accion para subir imagen de factura
 * @help        :: See https://sailsjs.comdocs/concepts/actions
 */

module.exports = {
  subirImagen: function(req, res) {
    let parametros = req.allParams();

    req.file('imagen').upload(
      {
        dirname: require('path').resolve(
          sails.config.appPath,
          'assets/images/facturas'
        )
      },
      (error, imagenSubida) => {
        if (error) {
          return res.status(400).json({ error: 'Error subiendo imagen' });
        }

        if (imagenSubida) {
          // Obtener nombre de archivo
          let tokenNombreArchivo = imagenSubida[0].fd.split('/');
          let nombreArchivo = tokenNombreArchivo[tokenNombreArchivo.length - 1];

          let archivo = {
            nombreArchivoOriginal: imagenSubida[0].filename,
            nombreArchivo: nombreArchivo,
            ubicacion: imagenSubida[0].fd,
          };

          sails.log.info('Registro imagen añadido');
          return res.status(200).json({
            mensaje: 'Imagen almacenada correctamente',
            imagen: archivo
          });
        }
      }
    );
  }
};

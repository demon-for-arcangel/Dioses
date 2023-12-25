const path = require('path');

module.exports = {
  mode: "development",
  entry: {
      login: './src/login/login.js',
      registro: './src/registro/registro.js',
      inicio: './src/inicio/inicio.js',
      rolUsuario: './src/rolUsuario/rolUsuario.js',
      admin: './src/admin/admin.js',
      clasificador: './src/clasificador/clasificador.js',
      donar: './src/donar/donar.js',
      perfil: './src/perfil/perfil.js',
      loteClasificador: './src/lotesClasificador/loteClasificador.js',
      clasificacion:'./src/clasificacion/clasificacion.js',
      receta: './src/receta/receta.js',
      adminLote: './src/adminLote/adminLote.js',
      joya: './src/joya/joya.js',
      componentes: './src/utils/componentes.js',
      map:'./src/donar/map.js',
      adminComponente:'./src/adminComponente/adminComponente.js',
  },
    output: {
      filename: '[name].main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      static: path.resolve(__dirname, './'), 
      port: 8091, 
      open: {
        target: 'src/index.html',
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
};
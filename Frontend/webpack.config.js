const path = require('path');

module.exports = {
  mode: "development",
  entry: {
      registro: './src/registro/registro.js',
      login: './src/login/login.js',
      restablecerPass: './src/restablecerPass/restablecerPass.js',
      dashboard: './src/dashboard/dashboard.js',
      inicio: './src/inicio/inicio.js',
      humanos: './src/humanos/humanos.js',
      pruebas: './src/pruebas/pruebas.js',
      crearHumanos: './src/crearHumanos/crearHumanos.js',
      crearPruebas: './src/crearPruebas/crearPruebas.js',
      miPerfil: './src/miPerfil/miPerfil.js',
      miPerfilHumano: './src/miPerfilHumano/miPerfilHumano.js',
      perfilHumanoMuerto: './src/miPerfilHumano/perfilHumanoMuerto.js',
      pruebasResueltas: './src/pruebasResueltas/pruebasResueltas.js'
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